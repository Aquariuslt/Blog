import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CARD_MAX_WIDTH } from '@theme-react/constants';
import { Keyword } from '@blog/common/interfaces/articles/article-metadata';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      maxWidth: CARD_MAX_WIDTH,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0, 0, 0)
      }
    },
    head: {
      margin: theme.spacing(1, 1)
    },
    link: {
      '&:hover': {
        cursor: 'pointer'
      },
      textDecoration: 'none'
    },
    desc: {
      margin: theme.spacing(1)
    },
    button: {
      padding: theme.spacing(0),
      margin: theme.spacing(0)
    }
  })
);

export const CollectionCard: React.FC<Keyword> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink} to={props.link}>
        <CardContent>
          <div className={classes.head}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {props.label}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div className={classes.desc}>
            <Typography color="textSecondary" variant="body2">
              {props.total} resources
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
