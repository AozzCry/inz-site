import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function OrderTable({ products, sumPrice }) {
  const { palette, breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  return (
    <TableContainer sx={{ bgcolor: palette.primary.dark }} component={Paper}>
      <Table sx={{ width: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell
              padding={matchesXs ? "normal" : "none"}
              variant="head"
              sx={{ width: 1 }}
            >
              Name
            </TableCell>
            <TableCell padding={matchesXs ? "normal" : "none"} variant="head">
              Price
            </TableCell>
            <TableCell padding={matchesXs ? "normal" : "none"} variant="head">
              Count
            </TableCell>
            <TableCell
              padding={matchesXs ? "normal" : "none"}
              variant="head"
              align="center"
            >
              Sum
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ productId, productName, productPrice, count }) => (
            <TableRow key={productId}>
              <TableCell padding={matchesXs ? "normal" : "none"} variant="body">
                {productName}
              </TableCell>
              <TableCell padding={matchesXs ? "normal" : "none"} variant="body">
                {productPrice.toFixed(2)}
              </TableCell>
              <TableCell
                padding={matchesXs ? "normal" : "none"}
                variant="body"
                align="center"
              >
                {count}
              </TableCell>
              <TableCell padding={matchesXs ? "normal" : "none"} variant="body">
                {(productPrice * count).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              padding={matchesXs ? "normal" : "none"}
              variant="body"
            ></TableCell>
            <TableCell
              padding={matchesXs ? "normal" : "none"}
              variant="body"
            ></TableCell>
            <TableCell
              padding={matchesXs ? "normal" : "none"}
              variant="body"
              align="center"
            >
              {products.reduce((i, c) => i + c.count, 0)}
            </TableCell>
            <TableCell padding={matchesXs ? "normal" : "none"} variant="body">
              {sumPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
