import SeqGen from "~/components/SeqGen";
import Header from "~/components/header";

export default function Home() {
    return (<>
            <title>SeqGen</title>
            <meta name="description" content="The aptly named Sequence Generator" />
            <Header />
            <SeqGen className="mt-5" />
    </>);
}
