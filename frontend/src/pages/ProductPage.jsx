import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ShoppingCart, Truck, Check } from "lucide-react";
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
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-lg text-stone-500!">{LOCALIZE.productPage.notFound}</p>
        </div>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-stone-50! transition hover:text-stone-200!"
        >
          <ArrowLeft className="h-4 w-4" /> {LOCALIZE.productPage.backButton}
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
            {product?.images.length < 2 ? (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl bg-stone-50">
                <img
                  src={product?.images[0]?.lien}
                  alt={product?.titre}
                  className="max-h-[400px] w-full object-contain mix-blend-multiply"
                />
              </div>
            ) : (
              <Carousel className="w-full text-stone-50!">
                <CarouselContent>
                  {product?.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="border-none shadow-none">
                          <CardContent className="flex aspect-square items-center justify-center rounded-xl bg-stone-50! p-6">
                            <img
                              src={image.lien}
                              alt={product?.titre}
                              className="max-h-[400px] w-full object-contain mix-blend-multiply"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            )}
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">{product?.titre}</h1>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-3xl font-bold text-stone-900">
                  {product?.prix} {LOCALIZE.currencySymbol}
                </p>
                {product?.stock > 1 && (
                  <div className="flex items-center gap-1 rounded-full bg-green-50! px-3 py-1 text-sm font-medium text-green-700!">
                    <Check className="h-3 w-3" /> {LOCALIZE.productPage.inStock}
                  </div>
                )}
              </div>
            </div>

            <p className="text-lg leading-relaxed text-stone-600!">{product?.description}</p>

            <div className="flex items-center gap-2 text-sm text-stone-500!">
              <Truck className="h-4 w-4" />
              <span>{LOCALIZE.productPage.freeShipping}</span>
            </div>

            <div className="my-2 h-px w-full bg-stone-200!" />

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-900">
                  {LOCALIZE.productPage.quantity}
                </span>
                <div className="flex items-center gap-4 rounded-full! border border-stone-200! px-4 py-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="text-stone-50! hover:text-stone-900!"
                  >
                    -
                  </button>
                  <span className="w-4 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="text-stone-50! hover:text-stone-900!"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-stone-900! px-8 py-4 font-bold text-white! transition-all hover:bg-stone-800! hover:shadow-lg active:scale-[0.98]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {LOCALIZE.productPage.addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default ProductPage;
