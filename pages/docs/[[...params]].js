import { useRouter } from "next/router";

function Params() {
  const { params = [] } = useRouter().query;
  return <div>params = {params[0]}</div>;
}

export default Params;
