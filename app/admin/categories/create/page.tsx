"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import usePostAction from "@/hooks/usePostAction";
import { createCategory } from "@/actions";
import { useState } from "react";

export default function AddCategories() {
  const [preview, setPreview] = useState<string | null>(null);
  const { action, isPending, data } = usePostAction({
    action: createCategory,
    defaultState: { error: "" },
    onSuccess: () => {
      alert("Category added successfully");
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
          <div className="input__row">
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
              />
            </div>
            <Input label="Category Name" type="text" name="name" />
            <button
              type="submit"
              disabled={isPending}
              className="listing__page__header__actions__button"
            >
              {isPending ? "Loading..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
