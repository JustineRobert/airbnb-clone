import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';
//import Login from '../components/Login';
import Fade from "react-reveal/Fade";
import { getSession } from "next-auth/client";
import { live, discover } from "../data";
import Cards from '../components/Cards';

export default function Home({ exploreData, cardsData, session }) {
  {/*if(!session) return <Login /> */}

  return (
    <div className="">
      <Head>
        <title>TITech Africa</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      
      <Header page="Home"/>
      <Banner />

      <main 
      className="max-w-7xl mx-auto px-8 sm:px-16">
          {/* Small Cards */}
        <Fade button>  
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/*pull data from a server-API endpoints*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" >
            {exploreData.map(({ _id, img, distance, location }) => (
              <SmallCard
                key={_id}
                img={img}
                distance={distance}
                location={location} 
                />
            ))}
          </div>
        </section>
        </Fade>

        {/* Large Card */}
        <Fade button>
        <LargeCard
            img="https://a0.muscache.com/im/pictures/258b129d-d1cd-48b5-86d4-86206c13ebf7.jpg?im_w=1440"
            title="Not sure where to go? Perfect."
            buttonText="I'm flexible"
          />
        </Fade>


        {/* Medium Cards */}
        <Fade button>
        <section>
        
          <h2 className="text-4xl font-semibold py-8">Live Anywhere in Africa</h2>

          <Cards {...live} className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3"/>

            {/*API Data here*/}
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ _id, img, title}) => (
              <MediumCard 
              key={_id} 
              img={img} 
              title={title} 
              />
          ))}
          </div>
        </section>
        </Fade>

          {/* Large Card */}
        <Fade button>
        <LargeCard
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='Wishlists curated by TITech'
          buttonText='Ready for inspiration'
        />
        </Fade>
        
        <Cards {...discover} />  
      </main>
      <Footer />
    
    </div>
  )
}

export async function getServerSideProps(context) {
  const exploreData = await fetch("https://airbnb-api.vercel.app/explore").then((res) => res.json());
  const cardsData = await fetch("https://airbnb-api.vercel.app/cards").then((res) => res.json());

  const session = await getSession(context);

  return {
    props: {
      exploreData,
      cardsData,
      session
    }
  }
}

