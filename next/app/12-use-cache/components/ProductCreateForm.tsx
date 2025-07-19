import Button from "@/components/Button"
import Input from "@/components/Input"

interface Props {
  onSubmit: (formData: FormData) => Promise<void>
}

export default function ProductCreateForm({ onSubmit }: Props) {
  return (
    <div className="max-w-md bg-white p-6 shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-5">Create Product</h1>
      <form action={onSubmit} className="space-y-4">
        <Input type="text" name="title" label="Product Title" required className="w-full" />
        <Input type="number" name="price" label="Price" required className="w-full" />
        <Input type="text" name="description" label="Description" required className="w-full" />
        <Button type="submit" className="w-full">Create Product</Button>
      </form>
    </div>
  )
}
