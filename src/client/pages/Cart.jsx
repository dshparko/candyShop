import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "./Announcement";
import Cake from "../Components/image/cake3.jpg";
import Dessert from "../Components/image/dessert_categories.jpg";
import {useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {userRequest} from "../../requestMethods";
import {Link} from "react-router-dom";


const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div`
  font-family: "Cambria";`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
  padding-right: 50px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.59) !important;
  padding: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
 
`;

const Image = styled.img`
  width: 200px;
  box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.31) !important;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 50px;
  height: 50vh;
  box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.47) !important;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();


    const onToken = (token)=>{
        setStripeToken(token)
    }


    useEffect(() => {
        const makeRequest = async () => {
            try {
                console.log(localStorage.getItem("token"))
                const res = await userRequest(localStorage.getItem("token")).post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                history('/success', {state:{
                    stripeData: res.data,
                    cart: cart, }});
            } catch {console.log("error")}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history]);

    return (
        <Container>
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag</TopText>
                        <Link to={"/orders"}><TopText>Orders</TopText></Link>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product._id}
                                        </ProductId>
                                        <ProductColor color={product.color}/>
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout name = "Bakery"
                                        billingAddress
                                        shippingAddress
                                        description={`Your total is $${cart.total}`}
                                        image={"https://bipbap.ru/wp-content/uploads/2019/06/eda-047.-800x800-640x640.jpg"}
                                        amount={cart.total*100}
                                        token={onToken}
                                        stripeKey={"pk_test_51L2UWOCcRCFByi1N3Vct1R3LaTdDGHu0jxAemfiJODesG2v5kqcVkz4pLOuSgYKwPXoVyAOZYtRvmXYNXwnxM5PW00YBNOs16t"}
                        ><Button>CHECKOUT NOW</Button>
                            </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};

export default Cart;