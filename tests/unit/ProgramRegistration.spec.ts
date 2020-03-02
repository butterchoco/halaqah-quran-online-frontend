import { shallowMount, createLocalVue } from "@vue/test-utils";
import store from "@/store/index.ts";
import ProgramRegistration from "@/views/ProgramRegistration.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("ProgramRegistration.vue", () => {
  let wrapper = shallowMount(ProgramRegistration, {
    store,
    localVue
  });

  it("has age in program registration", () => {
    const ageField = wrapper.find("#age-field");
    ageField.setValue(20);
    expect(wrapper.vm.$data.age).toMatch("20");
  });

  it("has domicile in program registration", () => {
    const domicileField = wrapper.find("#domicile-field");
    domicileField.setValue("Depok");
    expect(wrapper.vm.$data.domicile).toMatch("Depok");
  });

  it("has juzNumberMemorized in program registration", () => {
    const juzNumberMemorizedField = wrapper.find("#juzNumberMemorized-field");
    juzNumberMemorizedField.setValue(12);
    expect(wrapper.vm.$data.juzNumberMemorized).toMatch("12");
  });

  it("has juzTargetNumber in program registration", () => {
    const juzTargetNumberField = wrapper.find("#juzTargetNumber-field");
    juzTargetNumberField.setValue(12);
    expect(wrapper.vm.$data.juzTargetNumber).toMatch("12");
  });

  it("has hasTahsinExperience in program registration", () => {
    const hasTahsinExperienceField = wrapper.find("#hasTahsinExperience-field");
    hasTahsinExperienceField.setValue("1");
    expect(wrapper.vm.$data.hasTahsinExperience).toMatch("1");
  });

  it("has tahsinExperience in program registration", () => {
    const tahsinExperienceField = wrapper.find("#tahsinExperience-field");
    tahsinExperienceField.setValue("FPI");
    expect(wrapper.vm.$data.tahsinExperience).toMatch("FPI");
  });

  it("has infaqOptionNumber in program registration", () => {
    const infaqOptionNumberField = wrapper.find("#infaqOptionNumber-field");
    infaqOptionNumberField.setValue("2");
    expect(wrapper.vm.$data.infaqOptionNumber).toMatch("2");
  });

  it("has infaqChoice in program registration", () => {
    const infaqChoiceField = wrapper.find("#infaqChoice-field");
    infaqChoiceField.setValue("Ahmad Supriyanto");
    expect(wrapper.vm.$data.infaqChoice).toMatch("Ahmad Supriyanto");
  });

  it("has instagram in program registration", () => {
    const instagramField = wrapper.find("#instagram-field");
    instagramField.setChecked(true);
    expect(wrapper.vm.$data.programInfoReference.instagram).toBe(true);
  });
  it("has whatsapp in program registration", () => {
    const whatsappField = wrapper.find("#whatsapp-field");
    whatsappField.setChecked(true);
    expect(wrapper.vm.$data.programInfoReference.whatsapp).toBe(true);
  });
  it("has line in program registration", () => {
    const lineField = wrapper.find("#line-field");
    lineField.setChecked(true);
    expect(wrapper.vm.$data.programInfoReference.line).toBe(true);
  });
  it("has facebook in program registration", () => {
    const facebookField = wrapper.find("#facebook-field");
    facebookField.setChecked(true);
    expect(wrapper.vm.$data.programInfoReference.facebook).toBe(true);
  });

  it("has TermAndConditions1 in program registration", () => {
    const TermAndConditions1Field = wrapper.find("#TermAndConditions1-field");
    TermAndConditions1Field.setChecked(true);
    expect(wrapper.vm.$data.isTnC1Check).toBe(true);
  });

  it("has TermAndConditions2 in program registration", () => {
    const TermAndConditions2Field = wrapper.find("#TermAndConditions2-field");
    TermAndConditions2Field.setChecked(true);
    expect(wrapper.vm.$data.isTnC2Check).toBe(true);
  });

  it("calls checkField() when fields change", () => {
    const checkField = jest.fn();
    wrapper = shallowMount(ProgramRegistration, {
      localVue,
      store,
      methods: {
        checkField
      }
    });
    const ageField = wrapper.find("#age-field");
    ageField.trigger("change");
    expect(checkField).toBeCalled();
  });

  it("calls checkField() first time mounted", async () => {
    const checkField = jest.fn();
    wrapper = shallowMount(ProgramRegistration, {
      localVue,
      store,
      methods: {
        checkField
      }
    });
    await wrapper.vm.$nextTick();
    expect(checkField).toBeCalled();
  });
});
