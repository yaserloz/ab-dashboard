import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import { Helmet } from 'react-helmet';
import { Navigate, Routes, Route, useParams   } from 'react-router-dom';

const OrderToPdf = (props) => {
  const [orderInfo, setOrderInfo] = useState([]);

  const [orderLinesPageOne, setOrderLinesPageOne] = useState([]);
  const [orderLinesPageTwo, setOrderLinesPageTwo] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const {id} = useParams() ?? false
  
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  useEffect(() => {
    if(!id || !parseInt(id))
    return false
    axios.get('selling-orders/' + id).then((response) => {
      setOrderInfo(response.data.orderInfo);
      if (response.data.orderLines.length > 11) {
        setOrderLinesPageOne(response.data.orderLines.slice(0, 11));
        setOrderLinesPageTwo(response.data.orderLines.slice(11));
      } else {
        setOrderLinesPageOne(response.data.orderLines);
      }
      let total = 0;
      response.data.orderLines.forEach((line) => {
        total += (parseInt(line.count) * parseInt(line.unit_price));
      });
      setOrderTotal(total);
    });
  }, []);

  if(!id || !parseInt(id))
  return <Navigate  to="/404" />

  return (
    <>
      <Helmet>
        <title>
          {orderInfo
            ? orderInfo.first_name +
              ' ' +
              orderInfo.last_name +
              '- ' +
              orderInfo.id
            : null}
        </title>
      </Helmet>
      <div style={{ margin: '.5em' }}>
        <div style={{ width: '130px', margin: '0 auto' }}>
          <img style={{ width: '130px' }} src={logo} />
        </div>
        <div
          style={{
            fontFamily: 'Dancing Script cursive',
            color: '#ec5598',
            fontWeight: 550,
            fontSize: '50px',
            textAlign: 'center'
          }}
        >
          ANGE
        </div>
        <div
          style={{
            fontFamily: 'Dancing',
            Script: 'cursive',
            color: '#ec5598',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '30px'
          }}
        >
          BEAUTY
        </div>
        <div style={{ direction: 'rtl', marginBottom: '.5em' }} class="border">
          <div style={{ display: 'flex', margin: '.5em' }}>
            <div className="order-number" style={{ marginLeft: '.5em' }}>
              رقم الطلب : {orderInfo ? orderInfo.id : null}
            </div>
            <div className="order-number"></div>
          </div>

          <div style={{ display: 'flex', margin: '.5em' }}>
            <div className="order-number" style={{ marginLeft: '.5em' }}>
              تاريخ الطلب : {orderInfo ? orderInfo.created_at : null}
            </div>
            <div class="order-date"></div>
          </div>
        </div>
        <div className="client-contact-info border">
          <div style={{ flexGrow: 1, padding: '.3em', fontSize: 'large' }}>
            <div style={{ display: 'flex', margin: '.5em' }}>
              <div style={{ marginLeft: '.5em' }}>
                الاسم الكامل:{' '}
                {orderInfo
                  ? orderInfo.first_name + ' ' + orderInfo.last_name
                  : null}
              </div>
              <div style={{ flexGrow: '1' }}></div>
            </div>
            <div style={{ display: 'flex', margin: '.5em' }}>
              <div style={{ marginLeft: '.5em' }}>
                رقم الهاتف :{' '}
                {orderInfo
                  ? orderInfo.telephone + ' , ' + orderInfo.seconde_telephone
                  : null}{' '}
              </div>
              <div style={{ flexGrow: 1 }}></div>
            </div>
            <div style={{ display: 'flex', margin: '.5em' }}>
              <div style={{ marginLeft: '.5em' }}>
                العنوان : {orderInfo ? orderInfo.address_line : null}{' '}
              </div>
              <div style={{ flexGrow: 1 }}></div>
            </div>
            <div style={{ display: 'flex', margin: '.5em' }}>
              <div style={{ marginLeft: '.5em' }}>
                عنوان ثاني : {orderInfo ? orderInfo.second_address_line : null}{' '}
              </div>
              <div style={{ flexGrow: 1 }}></div>
            </div>
            <div style={{ display: 'flex', margin: '.5em' }}>
              <div style={{ marginLeft: '.5em' }}>
                المجموع الكلي للطلب :{' '}
                {parseInt(orderTotal).toLocaleString('ar-IQ')} دينار
              </div>
              <div style={{ flexGrow: 1 }}></div>
            </div>
          </div>
          <div
            style={{
              writingMode: 'vertical-rl',
              padding: '.5em',
              fontSize: '30px'
            }}
            className="border-right"
          >
            معلومات الزبون
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '.5em' }}>
          {/* <div style={{ flexGrow: 1 }}>
            <div
              style={{
                marginRight: ".5em",
                textAlign: "center",
                padding: "5px",
              }}
              className="border"
            >
              السعر الكلي
            </div>
            <div
              style={{ marginRight: ".5em", textAlign: "center" }}
              className="border"
            >
              {orderLinesPageOne && orderLinesPageOne.length
                ? orderLinesPageOne.map((line) => {
                    return (
                      <p>
                        {parseInt(line.one_product_total).toLocaleString(
                          "ar-IQ"
                        )}
                      </p>
                    );
                  })
                : null}
            </div> */}
          {/* </div> */}

          <div style={{ flexGrow: '1' }}>
            <div
              style={{ textAlign: 'center', padding: '5px' }}
              className="border"
            >
              العدد * السعر المنتج
            </div>
            <div style={{ textAlign: 'center' }} className="border">
              {orderLinesPageOne && orderLinesPageOne.length
                ? orderLinesPageOne.map((line) => {
                    return (
                      <p>
                        {parseInt(line.count).toLocaleString(
                          'ar-IQ'
                        )}{' '}
                        *{' '}
                        {parseInt(line.unit_price).toLocaleString(
                          'ar-IQ'
                        )}{' '}
                        ={' '}
                        {(parseInt(line.count) * parseInt(line.unit_price)).toLocaleString(
                          'ar-IQ'
                        )}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>

          <div style={{ flexGrow: '1' }}>
            <div
              style={{ textAlign: 'center', padding: '5px' }}
              className="border"
            >
              كود بار{' '}
            </div>
            <div style={{ textAlign: 'center' }} className="border">
              {orderLinesPageOne && orderLinesPageOne.length
                ? orderLinesPageOne.map((line) => {
                    return (
                      <p>{line.code_bar ? line.code_bar : '0000000000000'}</p>
                    );
                  })
                : null}
            </div>
          </div>

          <div style={{ flexGrow: 5 }}>
            <div
              style={{
                marginLeft: '.5em',
                textAlign: 'center',
                padding: '5px'
              }}
              className="border"
            >
              الوصف
            </div>
            <div
              style={{ marginLeft: '.5em', textAlign: 'right' }}
              className="border"
            >
              {orderLinesPageOne && orderLinesPageOne.length
                ? orderLinesPageOne.map((line) => {
                    return (
                      <p style={{ marginRight: '5px', direction: 'rtl' }}>
                        {line.title
                          ? line.product + ':- ' + truncate(line.title, 50)
                          : line.product + ':- من غير عنوان'}{' '}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        {orderLinesPageTwo && orderLinesPageTwo.length ? (
          <p>صفحة رقم 1</p>
        ) : null}
        <br /> <br />
        <br />
        <br />
        {
          //xxxxxx
        }
        {orderLinesPageTwo && orderLinesPageTwo.length ? (
          <div style={{ display: 'flex', marginTop: '1.5em' }}>
            {/* <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  marginRight: ".5em",
                  textAlign: "center",
                  padding: "5px",
                }}
                className="border"
              >
                السعر الكلي
              </div>
              <div
                style={{ marginRight: ".5em", textAlign: "center" }}
                className="border"
              >
                {orderLinesPageTwo && orderLinesPageTwo.length
                  ? orderLinesPageTwo.map((line) => {
                      return (
                        <p>
                          {parseInt(line.one_product_total).toLocaleString(
                            "ar-IQ"
                          )}
                        </p>
                      );
                    })
                  : null}
              </div>
            </div> */}
            <div style={{ flexGrow: '1' }}>
              <div
                style={{ textAlign: 'center', padding: '5px' }}
                className="border"
              >
                العدد * السعر المنتج
              </div>
              <div style={{ textAlign: 'center' }} className="border">
                {orderLinesPageTwo && orderLinesPageTwo.length
                  ? orderLinesPageTwo.map((line) => {
                      return (
                        <p>
                        {parseInt(line.count).toLocaleString(
                          'ar-IQ'
                        )}{' '}
                        *{' '}
                        {parseInt(line.unit_price).toLocaleString(
                          'ar-IQ'
                        )}{' '}
                        ={' '}
                        {(parseInt(line.count) * parseInt(line.unit_price)).toLocaleString(
                          'ar-IQ'
                        )}
                      </p>
                      );
                    })
                  : null}
              </div>
            </div>

            <div style={{ flexGrow: '1' }}>
              <div
                style={{ textAlign: 'center', padding: '5px' }}
                className="border"
              >
                كود بار{' '}
              </div>
              <div style={{ textAlign: 'center' }} className="border">
                {orderLinesPageTwo && orderLinesPageTwo.length
                  ? orderLinesPageTwo.map((line) => {
                      return <p>{line.code_bar ? line.code_bar : ' '}</p>;
                    })
                  : null}
              </div>
            </div>

            <div style={{ flexGrow: 5 }}>
              <div
                style={{
                  marginLeft: '.5em',
                  textAlign: 'center',
                  padding: '5px'
                }}
                className="border"
              >
                الوصف
              </div>
              <div
                style={{ marginLeft: '.5em', textAlign: 'right' }}
                className="border"
              >
                {orderLinesPageTwo && orderLinesPageTwo.length
                  ? orderLinesPageTwo.map((line) => {
                      return (
                        <p style={{ marginRight: '5px', direction: 'rtl' }}>
                          {line.title
                            ? line.product + ':- ' + truncate(line.title, 50)
                            : line.product + ':- من غير عنوان'}{' '}
                        </p>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        ) : null}
        {orderLinesPageTwo && orderLinesPageTwo.length ? (
          <p>صفحة رقم 2</p>
        ) : null}
      </div>
    </>
  );
};

export default OrderToPdf;
