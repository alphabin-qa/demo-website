import React from "react";

const Login = () => {
  return (
    <div >
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center max-w-[450px] max-h-[407px]">
                <form action="" className="">
                    <h2 className="text-[30px] text-center font-semibold pb-4 leading-9">LOG IN</h2>

                    <div className="w-[370px] h-[236px] gap-6 mt-5">
                        <div className="gap-3">
                            <label className="font[500] size-3.5 leading-4">EMAIL</label>
                            <input className="w-[370px] h-[42px] rounded-[3px] border-gray-[#D0D0D0] border-[1px] mt-2 px-3" type="text" />
                        </div>
                        <div className="pt-4 gap-3">
                            <label className="font[500] size-3.5 leading-4">PASSWORD<a className="float-end w-[400] text-[12px]">forgot password?</a></label>
                            {/* <label className="font[500] size-3.5 leading-4">forgot password?</label> */}
                            <input className="w-[370px] h-[42px] rounded-[3px] border-gray-[#D0D0D0] border-[1px] mt-2 px-3" type="password" />
                        </div>
                        <div>
                            <button className="font[700] leading-[18.8px] w-[370px] h-[46px] p-[10px] gap-[10px] bg-black text-white mt-6 align-center font-bold">LOG IN</button>
                        </div>
                    </div>  
                    <div>
                        <p className="font[400] leading-[20px] tracking-[0.6px] mt-4 w-[370px] h-[46px]">Haven't create an account? <a href="#" className="text-[#0021D1]">create an account</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login