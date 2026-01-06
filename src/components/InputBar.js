export default function Button({ content, onClick, className, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {content}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
        <input
          type={`${content.toLowerCase()}`}
          placeholder={`Enter your ${content.toLowerCase()}`}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
          autoComplete={`current-${content.toLowerCase()}`}
        />
      </div>
    </div>
  );
}
