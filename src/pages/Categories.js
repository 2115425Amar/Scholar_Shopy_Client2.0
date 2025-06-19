import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              to={`/category/${c.slug}`}
              key={c._id}
              className="group block bg-white shadow hover:shadow-lg rounded-lg transition duration-300"
            >
              <div className="flex items-center justify-center h-40 px-4 py-6">
                <h5 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 text-center">
                  {c.name}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
