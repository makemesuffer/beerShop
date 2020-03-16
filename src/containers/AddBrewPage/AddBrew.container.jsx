import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import getLocation from "../../dataAccess/mapsRepository/helpers";

import BrewForm from "../../components/BrewFormPage/BrewForm";
import { createBrew } from "../../dataAccess/brewRepository/helpers";
import { getBeerNames } from "../../braveNewStore/beerList/actions";
import getBeerDetails from "../../braveNewStore/beerDetails/actions";

class AddBrewContainer extends React.PureComponent {
  getResults = debounce(async () => {
    const { brewName } = this.state;
    await this.props.getBeerNames(brewName);
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
      warning: "",
      error: "",
      success: ""
    };
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

  handleBrewNameChange = async (e, values) => {
    if (values !== undefined && values !== null) {
      console.log(values.name);
      this.setState({ brewName: values.name });
      const { beerList } = this.props;
      console.log(beerList);
      const singleBeer = beerList.filter(beer => beer.name === values.name);
      await this.props.getBeerDetails(singleBeer[0].id);
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
          warning: ""
        });
      } else {
        this.setState({ warning: "Image is already uploaded" });
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
    const { user, beer, history } = this.props;
    const { brewName, impressions, location, brewType, photos } = this.state;
    if (beer !== null) {
      const payload = {
        brewName,
        impressions,
        location,
        brewType,
        photos,
        author: user.id,
        ingredients: beer.ingredients,
        brewingMethod: beer.method
      };
      const result = await createBrew(payload);
      if (result.data.success === true) {
        this.setState({ success: result.data.message });
        setTimeout(() => {
          history.replace("/brews");
        }, 3000);
      } else {
        this.setState({ error: result.data.error });
      }
    } else {
      this.setState({ error: "Please fill all the inputs" });
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
      warning,
      brewType,
      error,
      success
    } = this.state;
    console.log(beer);
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
          error={error}
          success={success}
          impressions={impressions.trim()}
          warning={warning}
          handleDelete={this.handleDelete}
          author={author}
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
  getBeerDetails: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

AddBrewContainer.defaultProps = {
  beerList: [],
  beer: null
};

const mapStateToProps = state => {
  return {
    beerList: state.beerList.items,
    user: state.userDetails.model,
    beer: state.beerDetails.model
  };
};

export default connect(mapStateToProps, { getBeerNames, getBeerDetails })(
  withRouter(AddBrewContainer)
);
