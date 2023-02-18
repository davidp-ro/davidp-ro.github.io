export interface Props {
  title: string;
  fromTo: string;
  children: React.ReactNode;
}

export default function Card({ title, fromTo, children }: Props) {
  return (
    <li className="my-6">
      <h3 className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0">
        {title}
      </h3>
      <p className="text-gray-500 italic text-sm opacity-80"> <svg
        xmlns="http://www.w3.org/2000/svg"
        className="scale-80 inline-block h-6 w-6 fill-skin-base"
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg> {fromTo}</p>
      <div className="ml-10 mt-2">
        {children}
      </div>
    </li>
  );
}
