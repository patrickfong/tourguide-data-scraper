const rp = require('request-promise');
const $ = require('cheerio');
const stringify = require('csv-stringify');
const fs = require('fs');
const nconf = require('nconf');

const columns = {
    id: 'Member ID',
    chinesename: 'Chinese Name',
    englishname: 'English Name',
    sex: 'Gender',
    bday: 'Birth Date',
    education: 'Background of Education',
    schoolbranchdept: 'School Branch Department',
    mobile: 'Mobile Phone Number',
    email: 'Email Address',
    yearsservice: 'Years of Service',
    lendscarddate: 'Leads the Card Date',
    vocationeducation: 'Vocational Education',
    travelagency: 'Name of Travel Agency',
    classification: 'Classification',
    languagelicense: 'Language Under License',
    otherlanguage: 'Other Langauges',
    expertin: 'Expert in',
    workingcondition: 'Working Condition',
    blog: 'Blog',
    previoustravelagency: 'Once was Appointed Travel Agency',
    proficiency: 'Proficiency',
    accolade: 'Accolade',
    experience: 'Experience',
    remarks: 'Remarks',
    dateentry: 'Eater Entered',
    daterenew: 'Last Updated'
};
var result = [];
var failed = 0;

nconf.argv().env();
var startguideid = nconf.get('start');
var endguideid = nconf.get('end');
var filename = nconf.get('filename');

process(startguideid, endguideid, filename);

async function process(startguideid, endguideid, filename) {
    nconf.argv().env();
    // let startguideid = 259;
    // let endguideid = 8739;
    
    for (let i = startguideid; i < endguideid; i++) {
        let url = 'http://hr.tourguide.org.tw/detail.aspx?id=' + i;
        console.log(url);
        await getdetail(url);
    }
    writecsv(result, filename);
}

async function getdetail(url) {
    try {
        let html = await rp(url);
        resume = {};
        resume.id = $('#FormView1_id', html).text();
        resume.chinesename = $('#FormView1_Label2', html).text();
        resume.englishname = $('#FormView1_Label3', html).text();
        resume.sex = $('#FormView1_sex', html).text();
        resume.bday = $('#FormView1_Label5', html).text();
        resume.education = $('#FormView1_school', html).text();
        resume.schoolbranchdept = $('#FormView1_Label7', html).text();
        resume.mobile = $('#FormView1_Label8', html).text();
        resume.email = $('#FormView1_Label9', html).text();
        resume.yearsservice = $('#FormView1_Label10', html).text();
        resume.lendscarddate = $('#FormView1_Label11', html).text();
        resume.vocationeducation = $('#FormView1_Label12', html).text();
        resume.travelagency = $('#FormView1_Label13', html).text();
        resume.classification = $('#FormView1_TGCATEGORY', html).text();
        resume.languagelicense = $('#FormView1_LANGUAGEPRO', html).text();
        resume.otherlanguage = $('#FormView1_Label16', html).text();
        resume.expertin = $('#FormView1_GUIDEPRO', html).text();
        resume.workingcondition = $('#FormView1_STATUS', html).text();
        resume.blog = $('#FormView1_Label19', html).text();
        resume.previoustravelagency = $('#FormView1_Label20', html).text();
        resume.proficiency = $('#FormView1_Label21', html).text();
        resume.accolade = $('#FormView1_Label22', html).text();
        resume.experience = $('#FormView1_Label23', html).text();
        resume.remarks = $('#FormView1_Label24', html).text();
        resume.dateentry = $('#FormView1_Label25', html).text();
        resume.daterenew = $('#FormView1_Label26', html).text();

        console.log(JSON.stringify(resume));
        result.push(resume);

    } catch (err) {
        failed++;
        console.log(err);
    }

    console.log('Failed count: ' + failed);
}

function writecsv(data, filename) {
    stringify(data, { header: true, columns: columns }, (err, output) => {
        if (err) throw err;
        fs.writeFile(filename, output, (err) => {
            if (err) throw err;
            console.log(filename + ' saved.');
        });
    });
}
