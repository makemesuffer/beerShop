import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

import BrewInput from "./BrewInput";
import BrewPreview from "./BrewPreview";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "0.7fr 1.3fr",
    textAlign: "center",
    gridColumnGap: 20
  },
  alerts: {
    marginTop: theme.spacing(2)
  }
}));

export default function BrewForm(props) {
  const {
    beerNames,
    handleChange,
    handleMapClick,
    location,
    photos,
    handleUpload,
    beerTypes,
    handleSubmit,
    handleBrewNameChange,
    handleBrewTypeChange,
    error,
    handleDelete,
    brewName,
    brewType,
    impressions,
    author,
    beer,
    createListData,
    success,
    warning
  } = props;

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl" className={classes.container}>
      <Paper className={classes.grid}>
        <BrewInput
          handleUpload={handleUpload}
          location={location}
          beerNames={beerNames}
          handleChange={handleChange}
          handleMapClick={handleMapClick}
          photos={photos}
          beerTypes={beerTypes}
          handleSubmit={handleSubmit}
          handleBrewNameChange={handleBrewNameChange}
          handleBrewTypeChange={handleBrewTypeChange}
          warning={warning}
          handleDelete={handleDelete}
        />
        <BrewPreview
          brewType={brewType}
          photos={photos}
          brewName={brewName}
          location={location}
          impressions={impressions}
          author={author}
          beer={beer}
          createListData={createListData}
        />
      </Paper>
      <div className={classes.alerts}>
        {success === "" ? <></> : <Alert severity="success">{success}</Alert>}
        {error === "" ? <></> : <Alert severity="error">{error}</Alert>}
      </div>
    </Container>
  );
}

BrewForm.propTypes = {
  beerNames: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func.isRequired,
  handleMapClick: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleUpload: PropTypes.func.isRequired,
  beerTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBrewNameChange: PropTypes.func.isRequired,
  handleBrewTypeChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  brewName: PropTypes.string.isRequired,
  brewType: PropTypes.string.isRequired,
  impressions: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  beer: PropTypes.objectOf(PropTypes.any),
  createListData: PropTypes.func.isRequired,
  warning: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};

BrewForm.defaultProps = {
  beerNames: [],
  beer: null
};
