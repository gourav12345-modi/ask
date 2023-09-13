import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../constants";

const NavbarWithSearch = () => {
  const dispatch = useDispatch()

  const {token} = useSelector((state) => state.userData)
  console.log("Token is ", token)
 
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:justify-end">
      {
        token ? (
         <>
          <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal cursor-pointer"
        >
          <Link to="/create" className="flex items-center">
            Create
          </Link>
        </Typography>
         <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal cursor-pointer"
          onClick={() => dispatch({type: LOGOUT})}
        >
            Logout
        </Typography>
         </>
        ):(
          <>
          <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer"
      >
        <Link to="/login" className="flex items-center">
          Login
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer"
      >
        <Link to="/regiser" className="flex items-center">
          Register
        </Link>
      </Typography>
          </>
        )
      }
    
    </ul>
  );

  return (
    <Navbar className="mx-auto sticky top-0 z-10 max-w-full px-4 py-3 rounded-none">
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
       <div className="flex items-center">
       <div className="relative flex w-full gap-2 md:w-max mr-2">
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
        <div className="hidden lg:block">{navList}</div>
       </div>
       
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default NavbarWithSearch
