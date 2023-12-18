import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function AdditionalInfo() {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up('sm'));

  const [expanded, setExpanded] = useState(matchesSm ? 'panel1' : '');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Stack sx={{ my: 1, div: { bgcolor: 'secondary.main', borderRadius: 6 } }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>Personal collection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can pick up the ordered products in our showrooms in Biała
            Podlaska, Białystok, Bielsko-Biała, Bydgoszcz, Częstochowa, Gdańsk,
            Gliwice, Katowice, Kielce, Kraków, Lublin, Łódź, Olsztyn, Opole,
            Poznań, Rzeszów, Szczecin, Tarnowskie Góry, Warsaw and Wrocław.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>Return</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Return of used equipment When you order new equipment, you can
            return your used equipment of the same type and with the same
            functions to us free of charge. You can read more about where and
            under what conditions you can return used electronic or electrical
            equipment in our help center.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>Courier delivery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Cash on delivery The shipping cost is given along with the insurance
            amount - parcels are always insured up to the value of the order. If
            damage to the company tapes is found, the received goods should be
            checked for completeness in the presence of the courier.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
