import { Link } from "react-router-dom";
import image1 from "/images/works/1.png"
import image2 from "/images/works/2.png"
import image3 from "/images/works/3.png"
import { Carousel } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
export default function HowItWorks(){
    const {t} = useTranslation();
    return (
        <div>
            <p className="text-lg font-semibold mt-5">{t("Only 3-steps away from your First e-fuldmagt")}</p>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mt-4 ">
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image1} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("First Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image2} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("Second Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image3} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("Third Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
            </div>
            <Carousel className="md:hidden">
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image1} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("First Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image2} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("Second Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
                <div className="flex flex-col text-center w-full items-center">
                    <img src={image3} className="w-full"></img>
                    <p className="text-lg font-bold my-4">{t("Third Step")}</p> 
                    <p className="text-md text-justify">Molestiae occaecati ducimus ratione omnis perspiciatis nobis eaque dolorem et. Consequatur dolores aut nulla temporibus deleniti sint ea. Et voluptatum unde nihil voluptas rerum molestias quae earum.</p>
                </div>
            </Carousel>
            <div className="flex justify-center w-full my-6">    
                <Link to = "/home" className="btn-primary w-[300px] h-[50px] text-center">
                    Create Fuldmagt
                </Link>
            </div>
        </div>
    )
}