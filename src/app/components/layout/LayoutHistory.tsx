import { Button, Grid } from "@mui/material"


export const LayoutHistory = () => {
    

    
    return (
        <Grid container sx={{display: 'flex', flex: 1}}>
            <Grid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button>Teste</Button>
            </Grid>
            <Grid item>
                <Button>Teste 2</Button>
            </Grid>

        </Grid>
    )
}