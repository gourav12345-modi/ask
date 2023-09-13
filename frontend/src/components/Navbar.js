import {
  Navbar,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
const NavbarWithSearch = () => {
  return (
    <Navbar className="mx-auto sticky max-w-full px-4 py-3 rounded-none">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Link to="/">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
         Ask
        </Typography>
        </Link>
       
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded">
            Search
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default NavbarWithSearch
