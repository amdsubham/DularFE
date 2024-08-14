import {store} from '../../../core/redux/store';
import {authAsyncAction} from '../auth/auth-actions';
import {
  STRIPE_CLOUD_SERVER_URL,
  STRIPE_PUBLIC_KEY,
  STRIPE_URL_SCHEME,
} from './config';
import {
  initPaymentSheet,
  initStripe,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

export function setUpStripe() {
  initStripe({
    publishableKey: STRIPE_PUBLIC_KEY,
    urlScheme: STRIPE_URL_SCHEME,
  });
}

export const fetchPaymentIntentClientSecret = ({amount}: any) => {
  return new Promise((resolve, reject) => {
    fetch(`${STRIPE_CLOUD_SERVER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'EUR',
      }),
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        reject(error);
      });
  });
};

export const initializePaymentSheet = ({
  user,
  amount,
  packageEndDate,
  navigate,
}: any) => {
  return new Promise((resolve, reject) => {
    fetchPaymentIntentClientSecret({amount})
      .then(({customer, ephemeralKey, paymentIntent}: any) => {
        initPaymentSheet({
          merchantDisplayName: 'Legendbea, Inc.',
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            email: user.email,
            phone: user.phone,
            name: user.name,
            address: {
              line1: 'Canary Place',
              line2: '3',
              city: 'Macon',
              state: '',
              country: 'Estonia',
              postalCode: '31217',
            },
          },
          returnURL: STRIPE_URL_SCHEME,
        })
          .then(() => {
            presentPaymentSheet()
              .then(response => {
                console.log('payment done', response);
                store.dispatch(
                  authAsyncAction.updateUserRequest({
                    packageEndDate,
                  }),
                );
                navigate('Home');
                resolve(response);
              })
              .catch(error => {
                console.log('payment error', error);
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        console.log('payment error ====>', error);
        reject(error);
      });
  });
};

// export function openCardModal(
//   user: any,
//   amount: any,
//   packageEndDate: any,
//   navigate: any,
// ) {
//   stripe
//     .paymentRequestWithCardForm({
//       smsAutofillDisabled: true,
//       requiredBillingAddressFields: 'full',
//       prefilledInformation: {
//         billingAddress: {
//           name: user.name,
//           line1: 'Canary Place',
//           line2: '3',
//           city: 'Macon',
//           state: '',
//           country: 'Estonia',
//           postalCode: '31217',
//           email: user.email,
//           phone: user.phone,
//         },
//       },
//     })
//     .then((response: any) => {
//       let tokenId = response.tokenId;
//       if (tokenId) {
//         paymentUsingCard({
//           amount: amount,
//           currency: 'usd',
//           token: tokenId,
//           description: 'Legendbae plan purchased.',
//         })
//           .then((respo: any) => {
//             if (respo.response) {
//               store.dispatch(
//                 authAsyncAction.updateUserRequest({packageEndDate}),
//               );
//               navigate('Home');
//             }
//           })
//           .catch(() => {
//             if (!IS_STRIPE_LIVE) {
//               store.dispatch(
//                 authAsyncAction.updateUserRequest({packageEndDate}),
//               );
//               navigate('Home');
//             }
//           });
//       }
//     });
// }

// export function paymentUsingCard(parameter: any) {
//   return new Promise((resolve, reject) => {
//     fetch(STRIPE_CLOUD_SERVER_URL, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(parameter),
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         resolve(responseJson);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
