import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 900,
    marginTop: theme.spacing(4)
  },
  inline: {
    display: "inline"
  }
}));

export default function Comments(props) {
  const { brew, user, handleDelete } = props;
  const classes = useStyles();
  const { comments } = brew;
  return (
    <List className={classes.root}>
      {comments.map(comment => {
        return (
          <div key={comment.userId}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.name} src={comment.img} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.message}
                    </Typography>
                  </>
                }
              />
              {user.id === comment.userId ? (
                <Button
                  onClick={() => {
                    handleDelete(comment);
                  }}
                >
                  delete
                </Button>
              ) : (
                <Button>report user</Button>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}

Comments.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  handleDelete: PropTypes.func.isRequired,
  brew: PropTypes.objectOf(PropTypes.any).isRequired
};

Comments.defaultProps = {
  user: null
};
