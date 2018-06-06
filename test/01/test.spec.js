/**
 * Main tests
 */

const moment = require('moment')

describe('Module', function () {
  const m = moment('2017-08-30T17:35:34.660Z').utc()
  let utils

  it('should import', function () {
    utils = require('../../dist')

    expect(utils).to.have.property('manipulateMoment')
    expect(utils).to.have.property('MomentEditor')
  })

  it('should manipulate to start of next day', function () {
    const mm = utils.manipulateMoment(m.clone(), [{
      m: 'startOf', p: 'd'
    }, {
      m: 'add', p: [1, 'd']
    }])

    expect(mm.toISOString()).to.equal('2017-08-31T00:00:00.000Z')
  })

  it('should manipulate to end of previous day', function () {
    const mm = utils.manipulateMoment(m.clone(), [{
      m: 'subtract', p: [1, 'd']
    }, {
      m: 'endOf', p: 'd'
    }])

    expect(mm.toISOString()).to.equal('2017-08-29T23:59:59.999Z')
  })

  it('should edit to start of next day (defaults)', function () {
    const ed = new utils.MomentEditor('so,ad')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-31T00:00:00.000Z')
  })

  it('should edit to start of next day (explicit)', function () {
    const ed = new utils.MomentEditor('so_d,ad_1_d')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-31T00:00:00.000Z')
  })

  it('should edit to end of previous day (defaults)', function () {
    const ed = new utils.MomentEditor('su,eo')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-29T23:59:59.999Z')
  })

  it('should edit to end of previous day (explicit)', function () {
    const ed = new utils.MomentEditor('su_1_d,eo_d')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-29T23:59:59.999Z')
  })

  it('should floor to second half of minute (explicit)', function () {
    const ed = new utils.MomentEditor('dn_30_m')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-30T17:30:00.000Z')
  })

  it('should floor to third quarter of day (explicit)', function () {
    const ed = new utils.MomentEditor('dn_6_H')

    expect(ed.edit(m).toISOString()).to.equal('2017-08-30T12:00:00.000Z')
  })
})
