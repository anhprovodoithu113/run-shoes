import { ProductColor } from "./product-color";
import { ProductStatus } from "./product-status";
import { Products } from "./products";

export interface ShoppingCartItem {
    product: Products,
    color: ProductColor,
    size: ProductStatus,
    orderAmount: number
}
