import { FullRefund } from "./full_refund";
import { PartialRefund } from "./partial_refund";
import { NoRefund } from "./no_refund copy";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const rule = RefundRuleFactory.getRefundRule(8);
    expect(rule).toBeInstanceOf(FullRefund);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    const ruleAt7 = RefundRuleFactory.getRefundRule(7);
    expect(ruleAt7).toBeInstanceOf(PartialRefund);

    const ruleAt1 = RefundRuleFactory.getRefundRule(1);
    expect(ruleAt1).toBeInstanceOf(PartialRefund);

    const ruleMid = RefundRuleFactory.getRefundRule(4);
    expect(ruleMid).toBeInstanceOf(PartialRefund);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const ruleAt0 = RefundRuleFactory.getRefundRule(0);
    expect(ruleAt0).toBeInstanceOf(NoRefund);

    const ruleNegative = RefundRuleFactory.getRefundRule(-1);
    expect(ruleNegative).toBeInstanceOf(NoRefund);
  });
});
