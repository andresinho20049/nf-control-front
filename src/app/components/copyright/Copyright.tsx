import {Typography, TypographyProps, Link} from '@mui/material';

export const Copyright = (props:TypographyProps) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" target="_blank" href="https://git.vibbra.com.br/nf-control-8612">
            NF Control
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}