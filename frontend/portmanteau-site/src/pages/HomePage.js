import { Link } from 'react-router-dom';

const HomePage = (props) => {
  return (
    <div>
      <h2>Welcome to Portmanteau!</h2>
      <hr />
      <p>/ˌpôrtˈmantō/</p>
        <p>noun</p>
        <p>1. a large trunk or suitcase, typically made of stiff leather and opening into two equal parts.</p>
        <p>2. a word blending the sounds and combining the meanings of two others, for example motel (from ‘motor’ and ‘hotel’) or brunch (from ‘breakfast’ and ‘lunch’).</p>
        <img src='https://miro.medium.com/max/576/1*S5wIaM_-yowX9orp1PeBtw.jpeg'/>
        <hr/>
        <p>Organize your wardrobe by creating small capsule collections using items you already own. Shop your closet and have fun mixing and matching!</p>
        <span>
        <Link to={'/capsule-list'}><button>See All Capsules</button></Link>
        <Link to={'/capsule-list/create'}><button>Create a Capsule</button></Link>
        </span>
    </div>
  )
}

export default HomePage;