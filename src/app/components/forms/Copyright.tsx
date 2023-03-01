import {Typography, TypographyProps, Link} from '@mui/material';

export const Copyright = (props:TypographyProps) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" target="_blank" href="https://github.com/andresinho20049/liga-bjj-front">
            Liga BJJ
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}