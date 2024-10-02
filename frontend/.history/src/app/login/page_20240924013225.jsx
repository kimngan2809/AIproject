"use client";
import { callAPI } from '@/utils/api-caller';
import { isLogined, setToken, setUser } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const router = useRouter();

    const onLoginClick = async () => {
        try {
            const data = {
                identifier: username,
                password
            };
            const res = await callAPI("/auth/local", "POST", data)
            console.log(res.data)
            setToken(res.data.jwt)
            const userRes = await callAPI("/users/me", "GET")
            setUser(userRes.data)
            console.log(res.data.jwt)
            router.replace("/")
        } catch (error) {
            setErrorText("Wrong Username or Password!");
            console.log(error);
        }
    };
    useEffect(()=>{
        console.log(isLogined())
        if (isLogined()){
            router.replace("/")
        }
    },[])

    const navigateToSignUp = () => {
        router.push('/signup');
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#fff9e6]">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-[#fff9e6] rounded-lg overflow-hidden" style={{ height: 'calc(100% + 100px)' }}>
                <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#fff9e6]">
                <Link href="/" ><img src="https://s3-alpha-sig.figma.com/img/860d/0dbe/6833eff95c9d3e9e22f2abe5933e0ec7?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eAMKbGKnY9Zty2F6LqCqAvMTTapIOH-JDMf7FNcQBTwxOS3nFTaOsi81ancHlfUlnzspBG6ZnCDsDKhCJB7-UzxOhCD2E5t9GWDBXRJqhVHUMSMqSsAt-inPHB6CVZa6Vbp5isOoJUtJ1GFik4gFCuXLtutOlUIVarF8zExt1JMUxfEieZM16fgaR90dEvoCKIdesR3PjRJHcCyXR6NF~RU4OCprFo42zoB7lQGbJVGX8kK1wcNegBqxHG0ga12hUgytz--Zy8rJ3Hr0L3ke4vkciOTtJDNiNadjefhGfChJZ45i6CBNXVx0s1w8A2YOZfA1w2ESgDUgFneuOOngOg__" 
                    width="100%" height="auto" /></Link>
                    
                    <h1 className="mt-6 text-5xl font-bold" style={{ color: '#015109', marginTop: 80 }}>LOG IN</h1>
                </div>

                <div className="lg:w-1/2 p-10 bg-[#fff9e6]" style={{ width: 'calc(50% + 50px)' }}>
                    <form className="space-y-6">
                        <div>
                            <p style={{color: '#015109', marginBottom: 3}}>Username</p>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); setErrorText(""); }}
                                required
                                className="block w-full bg-[#D7F8DA] rounded-md border border-[#3C8744] px-3 py-2 text-[#3C8744]
                                           focus:outline-[#5CA664] placeholder:text-[#5CA664] font-sm"
                                style={{ fontSize: '14px', borderRadius: '10px', WebkitBoxShadow: '0 0 0px 1000px #D7F8DA inset' }}

                            />
                        </div>

                        <div>
                            <p style={{color: '#015109', marginBottom: 3}}>Password</p>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setErrorText(""); }}
                                required
                                className="block w-full bg-[#D7F8DA] rounded-md border border-[#3C8744] px-3 py-2 text-[#3C8744]
                                           focus:outline-[#5CA664] placeholder:text-[#5CA664] font-sm "
                                style={{ color: '#3C8744', fontSize: '14px', borderRadius: '10px', WebkitBoxShadow: '0 0 0px 1000px #D7F8DA inset' }}
                            />
                        </div>

                        <div className="text-right" style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{  }}>
                            {errorText && <span style={{ color: "red" }}>{errorText}</span>}
                        </div >
                            <a href="#" className="text-sm text-blue-600 hover:underline italic" >Forgot Password?</a>
                        </div>

                        

                        <div>
                            <button
                                onClick={() => onLoginClick()}
                                type="button"
                                className="flex w-full justify-center rounded-md bg-[#015109] px-4 py-2 text-[#FFF9E2] font-medium hover:bg-[#01630B]"
                                style={{ boxShadow: 'none', fontSize: '17px', borderRadius: '10px' }}
                            >
                                Sign in
                            </button>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-[#D7F8DA] border border-[#3C8744] px-4 py-2 text-[#015109] font-medium hover:bg-[#C4EAC7]"
                                style={{ borderRadius: '10px' }}
                                onClick={() => signIn('google')}
                            >
                                <img src="https://s3-alpha-sig.figma.com/img/b7eb/6479/e2a86d3f9f7ea97b9118ebd26a87e92a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RVNO~bLu8XXDodPpSwfGIwbZwcuSKEzRA9Yl9Kce3KPVufMME8~UQpT7Q8VGBw-4ot2WJbIvZQorqVdaumgat6RYg6n8KYmj7~c6ATKG3rC1dt8V1S1TueMAqTYzbk03O5ZgUYyS5G5IdGJSJG3a2nSUKM46eXDB~OWAur~bEdy-NDvjdZL6sJ5Nzf5Ht7CMbmk~BpZ4gnUIj6BjkrwFgdOJ2helP4JAJ-ZvrERFc1Hczag9OlHo1ya3Qzk0vZogWYSxs2CDV~2tKL8Tr5pF1x5gM9Dae60bkgGZU4xfsfW35j40C5nYPRappxOmal9xBWLYAzhfC6iOhLXJo1RWjw__" width="25" height="auto" 
                                style={{ marginRight: '5px' }} />
                                Sign in with Google
                            </button>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-[#D7F8DA] border border-[#3C8744] px-4 py-2 text-[#015109] font-medium hover:bg-[#C4EAC7]"
                                style={{ borderRadius: '10px' }}
                                onClick={() => signIn('facebook')}
                            >
                                <img src="https://s3-alpha-sig.figma.com/img/bbc8/669f/ca270c0bb85ad8b5b7770783afab82d8?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UtNOHtwPrcpwtyfta67zYxXMq~kiKWViQuKj7h6lfDJoseq5ejby760vnAoQauMcpVmi7ENBJhHAw1~4qaKsRnkqfMmJ6yXI-VkgMNGRQf1CQQYsukRheMcJOy46paTc-sXpQWRgDw7gmOJxufr2-Ashz99mkVDMaTJ-yJaCFLJ9vUU1soy7RHk19dCJv7NG~PEMevLf4P6whM-k0JphzKIhOcY09nWwoCuOlkmvtL3DI7ga-2y2XUbhgna7h40EVVEyQIUt23xsE443g8fMijW9peVKgrPMpO6XOL7upNxN9Dxo5LoT7SgdIn-sjGEIhv-Q-Wk7oxwsKas3jrUBNw__" width="25" height="auto" 
                                style={{ marginRight: '5px' }} />
                                Sign in with Facebook
                            </button>
                        </div>

                        <div className="text-center text-sm text-[#015109] mt-4">
                            Don’t have an account? <a href="#" className="text-blue-600 hover:underline" onClick={navigateToSignUp}>Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;