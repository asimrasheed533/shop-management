"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import usePostAction from "@/hooks/usePostAction";
import { createProduct, getCategoriesId } from "@/actions";
import { useState } from "react";
import useGetAction from "@/hooks/useGetAction";

export default function AddProducts() {
  const [preview, setPreview] = useState<string | null>(null);
  const { action, isPending } = usePostAction({
    action: createProduct,
    defaultState: { error: "" },
    onSuccess: () => {
      alert("Product added successfully");
    },
  });

  const { data: categories } = useGetAction({
    key: "category",
    action: getCategoriesId,
  });

  return (
    <>
      <div className="product__container">
        <form
          action={action}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <button
            type="submit"
            disabled={isPending}
            className="listing__page__header__actions__button"
          >
            {isPending ? "Loading..." : "Add Category"}
          </button>
          <div
            className="input__row"
            style={{
              display: "flex",
              alignContent: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <input
                type="file"
                accept="image/*"
                style={{ marginBottom: "10px" }}
                name="image"
              />
            </div>
          </div>
          <div className="input__row">
            <Input label="Product Title" type="text" name="title" required />
            <select
              name="categoryId"
              id="category"
              style={{
                width: "100%",
                height: "40px",
                padding: "0 15px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            >
              <option>Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input__row">
            <Input label="Price" type="text" name="price" required />
          </div>
          <div className="input__row">
            <Input label="Description" type="text" name="description" />
          </div>
        </form>
      </div>
    </>
  );
}
