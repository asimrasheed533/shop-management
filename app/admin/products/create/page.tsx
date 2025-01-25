"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import usePostAction from "@/hooks/usePostAction";
import { createProduct, getCategoriesId } from "@/actions";
import { useState } from "react";
import useGetAction from "@/hooks/useGetAction";
import Select from "@/components/select";
import MultiImageUploader from "@/components/MultiImageUploader";
import Button from "@/components/Button";

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
      <form
        className="create__page__body__form"
        action={action}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Button />
        {/* <div className="listing__page__header__actions__button__warper">
          <button
            type="submit"
            disabled={isPending}
            className="listing__page__header__actions__button"
          >
            {isPending ? "Loading..." : "Add Category"}
          </button>
        </div> */}
        <div className="create__page__body__form__card__body__entry">
          <div className="create__page__body__form__card__body__entry__label">
            Images
          </div>
          <div className="create__page__body__form__card__body__entry__content">
            <MultiImageUploader />
          </div>
        </div>

        <div className="input__row">
          <Input label="Product Title" type="text" name="title" required />
          {categories?.map((category) => (
            <Select key={category.id} name="categoryId" label="Category" />
          ))}
        </div>
        <div className="input__row">
          <Input label="Price" type="text" name="price" required />
        </div>
        <div className="input__row">
          <Input label="Description" type="text" name="description" />
        </div>
      </form>
    </>
  );
}
