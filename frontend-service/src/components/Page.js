import { Helmet } from "react-helmet";

const Page = (props) => {
  const { children, title } = props;

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} | PeerPrep`}</title>
    </Helmet>
    {children}
  </>
}

export default Page;