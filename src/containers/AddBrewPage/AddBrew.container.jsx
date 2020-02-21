import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import getLocation from "../../dataAccess/mapsRepository/helpers";

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
      brewType: "",
      error: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
    if (name === "brewName") this.getResults();
  };

  handleBrewNameChange = (e, values) => {
    if (values !== undefined && values !== null) {
      this.setState({ brewName: values.name });
    }
  };

  handleBrewTypeChange = (e, values) => {
    if (values !== undefined && values !== null) {
      this.setState({ brewType: values });
    }
  };

  handleMapClick = async e => {
    const [lat, lon] = e.get("coords");
    const coords = `${lon},${lat}`;
    const result = await getLocation(coords);
    this.setState({ location: result.name });
  };

  handleUpload = e => {
    const { photos } = this.state;
    const dummy = [...photos];
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      if (!dummy.includes(reader.result)) {
        dummy.push(reader.result);
        this.setState({
          photos: dummy,
          error: ""
        });
      } else {
        this.setState({ error: "Image is already uploaded" });
      }
    };
    reader.readAsDataURL(file);
  };

  handleDelete = id => {
    const { photos } = this.state;
    const filtered = photos.filter(elem => {
      return elem !== id;
    });
    this.setState({ photos: filtered });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { brewName, impressions, location, brewType } = this.state;
    console.log(brewName, impressions, location, brewType);
  };

  render() {
    const { beerList } = this.props;
    const {
      location,
      photos,
      beerTypes,
      brewName,
      impressions,
      error,
      brewType
    } = this.state;
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
          handleBrewNameChange={this.handleBrewNameChange}
          handleBrewTypeChange={this.handleBrewTypeChange}
          brewName={brewName}
          brewType={brewType}
          impressions={impressions}
          error={error}
          handleDelete={this.handleDelete}
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
