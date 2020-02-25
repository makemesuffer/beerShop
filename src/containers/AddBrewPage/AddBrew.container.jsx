import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import moment from "moment";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import getLocation from "../../dataAccess/mapsRepository/helpers";

import BrewForm from "../../components/BrewFormPage/BrewForm";
import { getBeerNames, getBeerByName } from "../../store/brew/actions";
import { createBrew } from "../../dataAccess/brewRepository/helpers";

class AddBrewContainer extends React.PureComponent {
  getResults = debounce(() => {
    const { brewName } = this.state;
    this.props.getBeerNames(brewName);
  }, 200);

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
      error: "",
      time: ""
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: moment().format("LTS")
      });
    }, 1000);
  }

  createListData = (name, value, description) => {
    if (name !== "Yeast" && name !== "Water") {
      if (value === null) value = "NO INFO";
      else {
        value =
          value instanceof Array || value instanceof String ? value : [value];
      }
    }

    return { name, value, description };
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
    if (name === "brewName") this.getResults();
  };

  handleBrewNameChange = (e, values) => {
    if (values !== undefined && values !== null) {
      this.setState({ brewName: values.name });
      this.props.getBeerByName(values.name);
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
    this.setState({ location: cyrillicToTranslit().transform(result.name) });
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

  handleSubmit = async e => {
    e.preventDefault();
    const { user, beer } = this.props;
    const { brewName, impressions, location, brewType, images } = this.state;
    const payload = {
      brewName,
      impressions,
      location,
      brewType,
      images,
      author: user.id,
      ingredients: beer.ingredients,
      brewingMethod: beer.brewingMethod
    };
    const result = await createBrew(payload);
    if (result.data.status === 200) {
      console.log("successfully added!");
    }
  };

  render() {
    const { beerList, user, beer } = this.props;
    const author = `${user.firstName} ${user.lastName}`;
    const {
      location,
      photos,
      beerTypes,
      brewName,
      impressions,
      error,
      brewType,
      time
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
          impressions={impressions.trim()}
          error={error}
          handleDelete={this.handleDelete}
          author={author}
          time={time}
          beer={beer}
          createListData={this.createListData}
        />
      </>
    );
  }
}

AddBrewContainer.propTypes = {
  getBeerNames: PropTypes.func.isRequired,
  beerList: PropTypes.arrayOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  beer: PropTypes.objectOf(PropTypes.any),
  getBeerByName: PropTypes.func.isRequired
};

AddBrewContainer.defaultProps = {
  beerList: [],
  beer: undefined
};

const mapStateToProps = state => {
  return {
    beerList: state.brew.beerNames,
    user: state.user.user,
    beer: state.brew.singleBeer[0]
  };
};

export default connect(mapStateToProps, { getBeerNames, getBeerByName })(
  AddBrewContainer
);
