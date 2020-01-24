function onButtonClick() {


  if (window.PaymentRequest) {

    var methodData = [{
      // ‘basic-card' means standard card payments - credit and debit cards
      supportedMethods: 'basic-card'
    }];

    var details = {
      // If we are buying multiple items, each one can be included
      displayItems: [{
        label: 'Ticket',
        amount: {currency: 'USD', value: '0.0001'}
      }
      ],
      total: {
        label: 'Total',
        amount: {currency: 'USD', value: '0.0001'}
      }
    };


    var options = {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: false,
      requestShipping: false
    };

    var paymentRequest = new PaymentRequest(methodData, details, options);

    // show() makes it actually display the user interface
    paymentRequest.show()
      .then(function(paymentResponse) {
        // User has confirmed. paymentResponse contains the data entered.
        if (paymentRequest.canMakePayment) {
          paymentRequest.canMakePayment().then(function(result) {
            if (result) {
              // User has an active payment method
            } else {
              // No active payment method yet (but they could add one)
            }
          }).catch(function(error) {
            // Unable to determine
          });
        }
        // Here we would process it server-side...
        var methodData = [
          {
            supportedMethods: 'https://spay.samsung.com',
            data: {
              // Samsung Pay specific data here
            }
          }
        ];
        processPaymentDetails(paymentResponse)
          .then(function(paymentResponse) {
            // ...Then when processed successfully, this will make the dialog indicate success & then close:
            paymentResponse.complete('success');
            // We could also update the page here appropriately
          });
      })
      .catch(function(error) {
        alert(error)
      });
  } else {
    // Here we could fall back to a legacy checkout form
  }
}