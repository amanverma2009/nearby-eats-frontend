export default function Button({ content, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`min-w-fit px-8 bg-orange-500 text-white py-4 rounded-full font-semibold text-base shadow-lg active:scale-95 transition-transform cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
}
