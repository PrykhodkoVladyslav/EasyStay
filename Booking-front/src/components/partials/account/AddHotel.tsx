import {Link} from "react-router-dom";

const AddHotel = () => {
  return (
      <div className="add-hotel">
          <div className="components">
              <p>Зареєструйте своє помешкання</p>
              <Link className="link" to="/hotels/create">Зареєструвати</Link>
          </div>
      </div>
  );
}

export default AddHotel;