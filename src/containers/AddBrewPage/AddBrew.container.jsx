import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
// import getLocation from "../../dataAccess/mapsRepository/helpers";

import BrewForm from "../../components/BrewFormPage/BrewForm";
import { getBeer } from "../../store/beer/actions";

class AddBrewContainer extends React.PureComponent {
  getResults = debounce(() => {
    const { brewName } = this.state;
    this.props.getBeer(50, null, brewName);
  }, 300);

  constructor(props) {
    super(props);
    this.state = {
      brewName: "",
      // eslint-disable-next-line react/no-unused-state
      impressions: "",
      location: "",
      photos: [],
      beerTypes: [
        "Ale",
        "Lager",
        "Stout",
        "Porter",
        "Lambic",
        "Pilsner",
        "Pale Ale",
        "Weissbier",
        "Belgian Ale"
      ],
      // eslint-disable-next-line react/no-unused-state
      brewType: ""
    };
  }

  handleChange = (e, values) => {
    const { name } = e.target;
    if (values !== undefined && values !== null) {
      // С НЕЙМОМ ТАК НЕ РАБОТАЕТ из-за лишек сделай отдельные хендлы блин
      if (name === "brewName") this.setState({ brewName: values.name });
      else if (name === "brewType") this.setState({ brewType: values.name });
      else this.setState({ [name]: e.target.value });
    }
    if (name === "brewName") this.getResults();
  };

  handleMapClick = () => {
    this.setState({ location: "Улица Кирова, 1" });
    /* POKA NE RABOTAET
    const [lat, lon] = e.get("coords");
    const coords = `${lat},${lon}`;
    const result = await getLocation(coords);
    console.log(result);
     */
  };

  handleUpload = e => {
    const { photos } = this.state;
    const dummy = [...photos];
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      dummy.push(reader.result);
      this.setState({
        photos: dummy
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { brewName, impressions, location, brewType } = this.state;
    console.log(brewName, impressions, location, brewType);
  };

  render() {
    const { beerList } = this.props;
    const { location, photos, beerTypes, brewName, impressions } = this.state;
    console.log(brewName, impressions);
    const beerNames = beerList.map(elem => {
      return { name: elem.name };
    });
    return (
      <>
        <BrewForm
          beerNames={beerNames}
          handleChange={this.handleChange}
          handleMapClick={this.handleMapClick}
          handleUpload={this.handleUpload}
          handleSubmit={this.handleSubmit}
          location={location}
          photos={photos}
          beerTypes={beerTypes}
        />
      </>
    );
  }
}

AddBrewContainer.propTypes = {
  getBeer: PropTypes.func.isRequired,
  beerList: PropTypes.arrayOf(PropTypes.any)
};

AddBrewContainer.defaultProps = {
  beerList: []
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList
  };
};

export default connect(mapStateToProps, { getBeer })(AddBrewContainer);
