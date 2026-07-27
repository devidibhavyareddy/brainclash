const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-2">
    <label className="text-sm font-semibold text-white">
        {label}
      </label>

      <input
    className="w-full rounded-xl bg-white/10 border border-white/20 text-white p-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
    {...props}
/>
    </div>
  );
};

export default Input;