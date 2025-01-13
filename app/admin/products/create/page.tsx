"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import usePostAction from "@/hooks/usePostAction";
import { createCategory, createProduct } from "@/actions";
import { useState } from "react";

export default function AddProducts() {
  const [preview, setPreview] = useState<string | null>(null);
  const { action, isPending } = usePostAction({
    action: createProduct,
    defaultState: { error: "" },
    onSuccess: () => {
      alert("Product added successfully");
    },
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
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed #aaa",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    color: "#aaa",
                  }}
                >
                  No image selected
                </div>
              )}
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
            <Input label="Category Category" type="text" name="categoryId" />
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
