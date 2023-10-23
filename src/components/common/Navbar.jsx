import React, { useEffect, useState } from 'react'
import { Link, matchPath,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart,AiOutlineMenu} from "react-icons/ai"
import {LuChevronDown} from "react-icons/lu"


import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropDown from '../core/Auth/ProfileDropDown'



// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python",
//     },
//     {
//         title: "Web dev",
//         link: "/catalog/web-dev",
//     }
// ]

function Navbar() {

    // fetching all states 
    const {token}  = useSelector( (state)=> state.auth);
    const {user} = useSelector( (state)=> state.profile);
    const {totalItems} = useSelector( (state) => state.cart)

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)

    //api call
    const fetchSubLinks = async() => {
        setLoading(true)
            try {
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                console.log("Printing sublinks result ", result);

                //transforming into one arrray
                const categoriesList = result.data.allCategories.flatMap( (category) => category.name)
                console.log(categoriesList);

                setSubLinks(categoriesList);
            } catch (error) {
                console.log("could not fetch the categories list")
            }
            setLoading(false);
    }

    useEffect( ()=> {
        fetchSubLinks();
    },[])

    console.log("sub links", subLinks)


    const matchRoute = (route) =>{
        return matchPath({path: route}, location.pathname)
    }
    console.log("user and token ki value ",user,token)

  return (
    <div className={`flex h-14  justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>

        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            
            {/* image  */}
            <Link to={"/"}>
                <img src={logo} alt='lightlogo' loading='lazy' width={160} height={32}/>
            </Link>

            {/* Navlinks  */}

            <nav className='hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                    <div className={`relative flex items-center cursor-pointer gap-1 group ${matchRoute("/catalog/:catalogName") ? "text-yellow-25": "text-richblack-25"}`}>
                                        <p>{link.title}</p>
                                        <LuChevronDown/>

                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                    
                                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded-sm bg-richblack-5">
                                            </div>

                                            { loading ? (<p className="text-center">Loading...</p>):
                                                (subLinks.length ? (
                                                        subLinks.map( (sublink, index) => (
                                                            <Link key={index} to={`/catalog/${sublink.split(" ").join("-").toLowerCase()}`}
                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                            >
                                                                <p>{sublink}</p>
                                                            </Link>
                                                        ))
                                                    
                                                ) : (<div className="text-center">No Courses Found</div>) )
                                            }

                                        </div>

                                    </div>) : (
                                        <Link to={link?.path}>
                                            <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }

                </ul>
            </nav>

            {/* Login /signup/ Dashboard  */}
            <div className='hidden md:flex gap-x-4 items-center'>
                {

                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100 animate-bounce">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }


                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 p-[8px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 p-[8px] text-richblack-100 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown/>
                }


            </div>

            <button className="mr-4 md:hidden">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>

            

        </div>
      
    </div>
  )
}

export default Navbar
