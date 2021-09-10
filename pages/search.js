import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { API_KEY, CONTEXT_KEY } from '../keys';
import Response from '../Response';

function Search({ results }) {
    const router = useRouter();
    console.log(results);

    return (
        <div>
            <Head>
                <title>{router.query.term} - Edward Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* HEADER */}
            <Header />
            {/* SEARCH RESULT */}
            <SearchResults results={results} />

        </div>
    )
}

export default Search;

export async function getServerSideProps(context) {
    const useDummyData = false; // change to false to use actual google search api vice versa

    const startIndex = context.query.start || '0';

    const data = useDummyData ? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
    ).then(response => response.json());

    // after the server has rendered pass the result to the clients
    return {
        props: {
            results: data,
        },
    };
}
