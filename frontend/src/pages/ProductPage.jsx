import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ShoppingCart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Pages et fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useCart } from "../state/contexts/CartContext";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { getProductById } from "../api/produits";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function ProductPage() {
  const language = useLocalization();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct(id) {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }

    fetchProduct(id);
  }, [id]);

  if (!product && !loading)
    return (
      <PageTemplate>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg text-gray-600">{LOCALIZE.productPage.notFound}</p>
        </div>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-16 rounded-xl bg-white px-16 py-10 shadow-lg md:flex-row">
        {/* Image produit */}
        {product?.images.length < 2 ? (
          <div className="flex w-full justify-center rounded-lg bg-[#f9f5ef] p-6 md:w-1/2">
            <img
              src={product?.images[0]?.lien}
              alt={product?.titre}
              className="h-80 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <Carousel className="w-full max-w-xs text-white!">
            <CarouselContent>
              {product?.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image.lien}
                          alt={product?.titre}
                          className="h-80 object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        {/* Détails produit */}
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="flex justify-around self-start text-sm text-[#d9aa6e] hover:underline"
          >
            <ArrowLeft /> <p className="ml-2">{LOCALIZE.productPage.backButton}</p>
          </button>

          <h1 className="text-3xl font-bold text-gray-800">{product?.titre}</h1>
          <p className="leading-relaxed text-gray-600">{product?.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-[#d9534f]">
              {product?.prix} {LOCALIZE.currencySymbol}
            </p>
            <span className="rounded-full bg-[#f1e1c3] px-3 py-1 text-sm text-[#705d3b]">
              {LOCALIZE.productPage.freeShipping}
            </span>
          </div>

          {/* Sélecteur de quantité */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200! transition hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200! transition hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Boutons d’action */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex flex-1 justify-around rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:scale-105 hover:bg-green-700"
            >
              <ShoppingCart /> {LOCALIZE.productPage.addToCart}
            </button>

            <button className="flex flex-1 justify-around rounded-lg bg-[#d9aa6e] px-6 py-3 text-center font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#b8864b]">
              <Zap /> {LOCALIZE.productPage.buyNow}
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default ProductPage;
