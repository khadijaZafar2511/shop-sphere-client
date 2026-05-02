import { useContext} from 'react';
import Cards from './Cards';
import { GlobalContext  } from '../../Context/context1';
import { Link } from 'react-router-dom';

export default function Cardlist() {

  const myvar = useContext(GlobalContext);
  const { state } = myvar;
  const { data } = state;
  const scrollTop = () => {
   window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth" 
  });
}
  

  return (
    <>
      {data &&
        data.map((p) => (
          <Link
            to={`/home/cardinfo/${p.id}`}
            className="flex items-center mb-3  hover:scale-102   w-25/26"
            onClick={() => {
              scrollTop();
            }}
            key={p.id}
          >
            <Cards data={p} />
          </Link>
        ))}
    </>
  );
}
      

           


      
    
    


 