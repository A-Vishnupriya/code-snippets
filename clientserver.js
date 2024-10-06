function validatePhoneNumber() {
    var phone = g_form.getValue('phone_number');
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        g_form.addErrorMessage('Invalid phone number. Must be 10 digits.');
        return false;
    }
    return true;
}

var gr = new GlideRecord('incident');
gr.addEncodedQuery('state=6^resolved_at<javascript:gs.daysAgoStart(30)');
gr.query();
while (gr.next()) {
    gr.state = 7; // Closed state
    gr.update();
}
gs.print('Closed incidents older than 30 days.');
