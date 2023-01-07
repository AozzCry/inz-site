import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderTable({ products, sumPrice }) {
  const matchesXs = useMediaQuery(useTheme().breakpoints.up("xs"));

  return (
    <TableContainer sx={{ bgcolor: "primary.dark" }} component={Paper}>
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
          {products.map(
            ({
              productId,
              productName,
              productNameLink,
              productPrice,
              count,
            }) => (
              <TableRow
                sx={{
                  textDecoration: "none",
                  ":hover": { bgcolor: "secondary.dark" },
                }}
                key={productId}
              >
                <TableCell
                  padding={matchesXs ? "normal" : "none"}
                  variant="body"
                >
                  <Link
                    to={"../../product/" + productNameLink}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography sx={{ color: "text.primary" }}>
                      {" "}
                      {productName}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell
                  padding={matchesXs ? "normal" : "none"}
                  variant="body"
                >
                  {productPrice.toFixed(2)}
                </TableCell>
                <TableCell
                  padding={matchesXs ? "normal" : "none"}
                  variant="body"
                  align="center"
                >
                  {count}
                </TableCell>
                <TableCell
                  padding={matchesXs ? "normal" : "none"}
                  variant="body"
                >
                  {(productPrice * count).toFixed(2)}
                </TableCell>
              </TableRow>
            )
          )}
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
