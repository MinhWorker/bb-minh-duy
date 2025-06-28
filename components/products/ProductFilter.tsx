"use client";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

type OptionProps = {
  value: string,
  label: string
}

type ProductFilterProps = {
  handleFilter: (options: string[]) => void;
  chosenCategories: MultiValue<OptionProps>;
  setChosenCategories: Dispatch<SetStateAction<MultiValue<OptionProps>>>;
}

const ProductFilter = ({ handleFilter, chosenCategories, setChosenCategories }: ProductFilterProps) => {
  const [categories, setCategories] = useState<OptionProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/users/categories`);
      const data = await res.json();

      const fetchedCategories = data.categories.map((category: { name: string, id: string }) => ({
        value: category.id,
        label: category.name
      }))

      setCategories([
        ...fetchedCategories,
        {
          label: "Khác...",
          value: "none"
        }
      ]);
    }

    fetchCategories();
  }, []);

  const handleFilterFetch = () => {
    const formattedCategories = chosenCategories.map((category) => category.value);
    handleFilter(formattedCategories);
  }

  return (
    <div className="px-10 md:px-0 md:flex items-center justify-center gap-3 mb-10">
      <p className="text-primary-foreground font-bold text-lg">Lọc theo</p>
      <Select
        options={categories}
        isMulti
        placeholder="Hãy chọn phân loại sản phẩm"
        className="w-full md:w-2/3 xl:w-1/2 my-3"
        onChange={(newCategory) => setChosenCategories(newCategory)}
        value={chosenCategories}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "inset 0 1px 3px rgb(0 0 0 / 0.2)",
            padding: "5px 0 5px 0"
          }),
          indicatorSeparator: (indicatorSeparator) => ({
            ...indicatorSeparator,
            display: "none"
          }),

          multiValue: (multiValue) => ({
            ...multiValue,
            margin: "5px 10px 5px 5px",
            backgroundColor: "#77b267",
            borderRadius: "7px",
            boxShadow: "0 2px 4px rgb(0 0 0 / 0.2)",
            overflow: "hidden"
          }),
          multiValueLabel: (multiValueLabel) => ({
            ...multiValueLabel,
            color: "#ffffff",
            padding: "5px",
            fontSize: "15px"
          }),
          multiValueRemove: (multiValueRemove) => ({
            ...multiValueRemove,
            color: "#ffffff",
            ":hover": {
              backgroundColor: "transparent",
              color: "#ea3131",
            }
          }),
          dropdownIndicator: (dropdownIndicator) => ({
            ...dropdownIndicator,
            color: "#77b267",
          }),
          option: (option, state) => ({
            ...option,
            color: "#3c5c34",
            fontWeight: "medium",
            backgroundColor: state.isFocused ? "#e9e9e9" : "#ffffff"
          })
        }}
      />
      <div
        className="bg-primary p-2 rounded-md shadow-black/40 shadow-md flex items-center justify-center hover:bg-primary-foreground transform transition-all active:scale-95"
        onClick={handleFilterFetch}
      >
        <Filter color="#ffffff" />
        <span className="text-white md:hidden">Lọc</span>
      </div>
    </div>
  )
};

export default ProductFilter;
