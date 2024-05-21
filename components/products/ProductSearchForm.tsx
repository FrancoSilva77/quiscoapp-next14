export default function ProductSearchForm() {
  return (
    <form className="flex items-center">
      <input
        type="text"
        placeholder="Buscar producto"
        name="search"
        className="p-2 placeholder-gray-400 w-full"
      />

      <input
        type="submit"
        value={'Buscar'}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  );
}
