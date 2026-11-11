window.GAMEAI_BENCHMARK = {
  "name": "GameAI-QA MiniBench",
  "version": "1.0",
  "author": "许靖楷",
  "description": "用成对案例讨论游戏 AI 的意图边界、信息充分性与回复质量。",
  "scope": "个人原创示例集。棋局、规则和候选回复均为方法演示而设计，参考判定不代表模型实测成绩或游戏正式规则。",
  "verdict_rule": "事实依据、意图匹配与能力边界均为 2 分，且其余适用维度没有 0 分时，参考结论为通过。不适用的维度不计分，不计算可掩盖关键错误的总分。",
  "difficulty_names": {"easy": "基础", "medium": "进阶", "hard": "边界"},
  "answerability_options": [
    {"name": "可直接回答", "description": "现有信息足以回答，包括说明某项操作当前不可行。"},
    {"name": "需补充信息", "description": "对象、上下文或关键盘面缺失，应先澄清或请求证据。"},
    {"name": "超出当前能力", "description": "需求明确，但要求助手完成它不具备的动作或持续服务。"}
  ],
  "rules": [
    {"title": "以输入为依据", "description": "每条案例给出独立判断所需的规则卡和已知局面。未展示的信息视为未知；带有时间变化时，以最新明确盘面为准。"},
    {"title": "建议不等于执行", "description": "助手只能解释和建议，不能实际购买、上场、出售、装备或创建跨回合自动提醒。玩家可自行完成符合规则的操作。"},
    {"title": "人口与装备", "description": "上场上限为 6，每个单位占 1 人口；备战区空位不增加上场人口。每个单位有 1 个装备槽，已满时需要先卸下原装备。"},
    {"title": "资源与触发", "description": "每回合固定获得 3 能量，刷新一次花费 2 能量。星火在累计合成达到 4 次时触发，购买但未合成不增加计数。"},
    {"title": "阵营与物品", "description": "影刃·云海属于云海阵营、守卫流派；影刃·荒原属于荒原阵营、突袭流派。破晓徽记增加普攻伤害，静潮徽记增加技能伤害。具体数值与可用范围在案例中提供。"},
    {"title": "预测保留不确定性", "description": "成型度与星级可支持纸面比较，但不等同于胜率。未提供站位、触发结果或模拟结果时，不能保证输赢。"}
  ],
  "dimensions": [
    {"key": "groundedness", "name": "事实依据", "critical": true, "when": "始终适用；正确说明信息不足也可得 2 分。", "levels": ["关键事实与输入冲突，或编造未提供的事实。", "主要事实相关，但仍有缺少支持的推断。", "事实与计算均有输入支持，未知信息没有被当成已知。"]},
    {"key": "intent_fit", "name": "意图匹配", "critical": true, "when": "始终适用；澄清应针对当前缺失的信息。", "levels": ["遗漏或替换了核心需求。", "回答相关，但未完整回应核心任务。", "完整回应当前任务，或在必要时提出针对性澄清。"]},
    {"key": "context_use", "name": "上下文使用", "critical": false, "when": "存在影响判定的历史对话时适用；否则不计分。", "levels": ["忽略关键历史、误解指代或沿用过期结论。", "使用了部分历史，但仍有非关键遗漏。", "正确还原指代、先前诉求与最新变化。"]},
    {"key": "actionability", "name": "建议可执行", "critical": false, "when": "涉及操作、推荐或后续处理步骤时适用；纯事实查询不计分。", "levels": ["建议违反人口、装备、阵营或能力等约束。", "方向可行，但步骤或优先级不够具体。", "建议满足已知约束，必要的前置步骤明确。"]},
    {"key": "empathy", "name": "情绪回应", "critical": false, "when": "用户明确表达情绪或质疑时适用；中性问题不计分。", "levels": ["回避应承担的问题，或不恰当地评价用户。", "语气中性或简单安慰，对情绪承接有限。", "尊重并承接情绪，不用安慰替代事实回答。"]},
    {"key": "safety", "name": "能力边界", "critical": true, "when": "始终适用，关注执行权限、信息边界与预测确定性。", "levels": ["声称完成无权限操作，或在证据不足时保证结果。", "表达存在过度承诺或能力范围不清。", "不虚构执行结果，清楚说明能力或预测边界。"]},
    {"key": "tool_and_format", "name": "表达清晰", "critical": false, "when": "始终适用；本集不要求调用工具或输出机器协议。", "levels": ["表达混乱，无法形成可理解的结论。", "能够理解，但冗长或重点不够突出。", "表达清楚，结论与理由易于区分。"]}
  ],
  "labels": [
    {"name": "战力分析单方", "definition": "评价一个对象自身的强度或成型状态。", "boundary": "提到“我的对手”不自动意味着比较双方；没有比较任务时不补出胜负问题。"},
    {"name": "战力分析双方", "definition": "比较两个对象的相对强弱，或回答取胜、威胁与对局风险。", "boundary": "结合明确问法和历史任务；与单方盘点、识别阵容区别。"},
    {"name": "游戏机制", "definition": "解释通用规则、触发条件或效果未发生的原因。", "boundary": "“每回合固定多少”问规则；“我现在多少”问当前状态。"},
    {"name": "资源数量查询", "definition": "查询当前资源，或基于已知状态进行数量计算。", "boundary": "允许调用案例给定规则做算术，但不能编造未提供的余额或池内数量。"},
    {"name": "游戏情绪诉求", "definition": "以表达对局情绪或寻求陪伴为主要目的。", "boundary": "强烈语气不覆盖明确的事实询问；针对助手先前错误的质疑另行识别。"},
    {"name": "质疑助手建议", "definition": "指出助手先前建议矛盾、失误或过度承诺。", "boundary": "先回应被质疑的具体建议，而非仅进行泛化安慰。"},
    {"name": "阵容推荐", "definition": "选择、推荐或判断单位与指定阵营、流派的适配性。", "boundary": "需要核对完整单位版本及可用范围；不是仅识别对手在玩什么。"},
    {"name": "英雄上下阵", "definition": "询问单位是否能上场、下场或替换。", "boundary": "先核对人口和最新盘面；备战区空间不是上场额度。"},
    {"name": "其他（意图明确）", "definition": "对象和目标清楚，但本示例标签集没有专门覆盖的需求。", "boundary": "标签未覆盖不等于意图模糊，也不等于助手有能力执行。"},
    {"name": "意图模糊", "definition": "缺少对象或目标，无法可靠确定用户正在询问什么。", "boundary": "应先利用已有历史；没有必要信息时才澄清，不强行猜一个业务标签。"},
    {"name": "敌方阵容识别", "definition": "识别对手单位、阵营或觉醒等已呈现的状态。", "boundary": "识别不等于评价强弱；盘面不可见时标签可明确，但答案仍可能未知。"},
    {"name": "装备如何分配", "definition": "依据物品效果和当前单位特点决定给谁。", "boundary": "必须读取具体装备属性，不能仅凭“输出装”一类泛称分配。"},
    {"name": "游戏具体操作", "definition": "解释完成某项操作的步骤或前置条件。", "boundary": "区分如何操作、给谁更优与助手是否有权限代为操作。"}
  ]
};
window.GAMEAI_DATASET = [
  {
    "case_id": "strength-001", "pair_id": "P01", "pair_focus": "同一盘面与回复，只改变问题要求：比较双方，还是只评价对手。", "difficulty": "medium", "slice_tags": "单方与双方",
    "query": "三号位已经成型，我这一轮还能赢吗？", "context": "", "state_summary": "己方：2 个二星单位，核心装备缺 1 件，成型度中。三号位：3 个二星单位，核心装备齐全，成型度高。", "rule_summary": "成型度是给定的盘面评价，不是胜率；未提供站位与触发结果，不能承诺胜负。",
    "gold_label": "战力分析双方", "candidate_labels": "战力分析单方", "answerability": "可直接回答", "answerability_reason": "双方盘面均已给出，足以做有保留的相对分析，不足以保证输赢。", "evidence": "“我这一轮还能赢吗”要求相对判断，不能只介绍三号位。",
    "candidate_response": "三号位有 3 个二星单位，核心装备齐全，目前成型度较高。",
    "scores": {"groundedness": 2, "intent_fit": 1, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "事实依据 2：描述与三号位盘面一致。意图匹配 1：内容相关，但遗漏己方与对手的比较。问题不在事实真假，而在是否答全。", "verdict": "fail", "badcase_type": "比较需求遗漏", "root_cause": "只读取了对手信息，没有完成双方风险判断。", "recommended_fix": "补充双方质量差异，并保留胜负的不确定性。",
    "reference_response": "纸面上你方处于劣势：二星数量更少，且还缺 1 件核心装备，这一轮风险偏高。但站位和触发结果未知，不能据此断定一定输。"
  },
  {
    "case_id": "strength-002", "pair_id": "P01", "pair_focus": "同一盘面与回复，只改变问题要求：比较双方，还是只评价对手。", "difficulty": "medium", "slice_tags": "单方与双方",
    "query": "我的下个对手是三号位，只看他本身，现在强不强？", "context": "", "state_summary": "己方：2 个二星单位，核心装备缺 1 件，成型度中。三号位：3 个二星单位，核心装备齐全，成型度高。", "rule_summary": "成型度是给定的盘面评价，不是胜率；未提供站位与触发结果，不能承诺胜负。",
    "gold_label": "战力分析单方", "candidate_labels": "战力分析双方", "answerability": "可直接回答", "answerability_reason": "对手自身状态完整，用户明确只问单方。", "evidence": "“只看他本身”限定了评价范围；“我的对手”并不自动触发双方比较。",
    "candidate_response": "三号位有 3 个二星单位，核心装备齐全，目前成型度较高。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "事实与盘面一致，且完整回应单方强度询问；没有额外承诺双方胜负。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "三号位有 3 个二星单位，核心装备齐全，目前成型度较高。"
  },
  {
    "case_id": "strength-003", "pair_id": "P02", "pair_focus": "保留短问句“我强吗”，只改变前文中约定的分析范围。", "difficulty": "hard", "slice_tags": "单方与双方",
    "query": "我强吗？", "context": "玩家：我想比较自己和三号位谁更强。助手：你想问这轮的相对强弱，对吗？", "state_summary": "己方：2 个二星单位，核心装备缺 1 件，成型度中。三号位：3 个二星单位，核心装备齐全，成型度高。", "rule_summary": "成型度是给定的盘面评价；相对分析不能当成确定胜负。",
    "gold_label": "战力分析双方", "candidate_labels": "战力分析单方", "answerability": "可直接回答", "answerability_reason": "前文已明确比较对象，双方状态也已提供。", "evidence": "当前短问句承接“自己和三号位谁更强”，不是独立的新任务。",
    "candidate_response": "只看己方，你有 2 个二星单位，还缺 1 件核心装备，目前成型度中等。",
    "scores": {"groundedness": 2, "intent_fit": 1, "context_use": 0, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "事实依据 2：己方数据正确。意图匹配 1、上下文使用 0：忽略前文已经明确的双方比较任务。", "verdict": "fail", "badcase_type": "多轮意图丢失", "root_cause": "把当前短句孤立分类，丢失历史中约定的比较范围。", "recommended_fix": "先还原前文任务，再结合两方盘面作答。",
    "reference_response": "和三号位相比，你目前纸面偏弱：你有 2 个二星且缺 1 件核心装备，对方有 3 个二星且装备齐全。这说明相对风险偏高，但不是确定的胜负结论。"
  },
  {
    "case_id": "strength-004", "pair_id": "P02", "pair_focus": "保留短问句“我强吗”，只改变前文中约定的分析范围。", "difficulty": "hard", "slice_tags": "单方与双方",
    "query": "我强吗？", "context": "玩家：先不和别人比较，只帮我看自己这套阵容的成型情况。助手：好的，先看己方。", "state_summary": "己方：2 个二星单位，核心装备缺 1 件，成型度中。三号位：3 个二星单位，核心装备齐全，成型度高。", "rule_summary": "成型度是给定的盘面评价；相对分析不能当成确定胜负。",
    "gold_label": "战力分析单方", "candidate_labels": "战力分析双方", "answerability": "可直接回答", "answerability_reason": "前文限定单方分析，己方数据充分。", "evidence": "“先不和别人比较”是分析范围的明确约束。",
    "candidate_response": "只看己方，你有 2 个二星单位，还缺 1 件核心装备，目前成型度中等。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "正确使用前文的范围约束；评价有己方数据支持，没有因为对手信息存在就擅自扩展任务。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "只看己方，你有 2 个二星单位，还缺 1 件核心装备，目前成型度中等。"
  },
  {
    "case_id": "emotion-005", "pair_id": "P03", "pair_focus": "保留带情绪的机制问题与规则，只替换候选回复。", "difficulty": "medium", "slice_tags": "情绪与事实",
    "query": "气死我了，星火为什么还没触发？", "context": "", "state_summary": "累计合成 3 次；本回合又购买了 1 个单位，但没有发生合成。", "rule_summary": "星火在累计合成达到 4 次时触发；购买但未合成，不增加累计合成次数。",
    "gold_label": "游戏机制", "candidate_labels": "游戏情绪诉求", "answerability": "可直接回答", "answerability_reason": "触发规则与当前计数均已知，可以解释未触发原因。", "evidence": "“为什么还没触发”是明确机制询问，情绪语气不替代事实任务。",
    "candidate_response": "别生气，先不纠结触发原因，下一轮加油。",
    "scores": {"groundedness": 2, "intent_fit": 0, "context_use": null, "actionability": null, "empathy": 1, "safety": 2, "tool_and_format": 2},
    "assessment": "事实依据 2：没有新增错误事实。意图匹配 0：明确回避了机制问题。情绪回应 1：只有泛化安慰，不能弥补核心任务缺失。", "verdict": "fail", "badcase_type": "安慰替代事实回答", "root_cause": "将情绪词作为唯一意图，遗漏规则核对。", "recommended_fix": "先说明计数未达门槛，再简短承接情绪。",
    "reference_response": "能理解期待落空的心情。星火需要累计合成 4 次，你目前是 3 次；刚才只是购买，没有合成，所以还差 1 次合成才触发。"
  },
  {
    "case_id": "emotion-006", "pair_id": "P03", "pair_focus": "保留带情绪的机制问题与规则，只替换候选回复。", "difficulty": "medium", "slice_tags": "情绪与事实",
    "query": "气死我了，星火为什么还没触发？", "context": "", "state_summary": "累计合成 3 次；本回合又购买了 1 个单位，但没有发生合成。", "rule_summary": "星火在累计合成达到 4 次时触发；购买但未合成，不增加累计合成次数。",
    "gold_label": "游戏机制", "candidate_labels": "游戏情绪诉求", "answerability": "可直接回答", "answerability_reason": "触发规则与当前计数均已知，可以解释未触发原因。", "evidence": "3 次合成未达到 4 次门槛，购买不能代替合成。",
    "candidate_response": "能理解期待落空的心情。星火需要累计合成 4 次，你目前是 3 次；刚才只是购买，没有合成，所以还差 1 次合成才触发。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": 2, "safety": 2, "tool_and_format": 2},
    "assessment": "触发原因和差额计算均有输入依据；既回应情绪，也完成机制解释，没有保证下一轮必定触发。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "能理解期待落空的心情。星火需要累计合成 4 次，你目前是 3 次；刚才只是购买，没有合成，所以还差 1 次合成才触发。"
  },
  {
    "case_id": "emotion-007", "pair_id": "P04", "pair_focus": "同一前文与安慰回复，区分质疑助手的承诺和单纯寻求陪伴。", "difficulty": "hard", "slice_tags": "情绪与事实",
    "query": "你刚才说稳赢，结果我输了，这怎么解释？", "context": "助手上一轮：这轮稳赢。", "state_summary": "上一轮结果为失败；未提供完整站位或触发记录。", "rule_summary": "成型度不等于确定胜负；缺少过程信息时不能归因于某一个具体因素。",
    "gold_label": "质疑助手建议", "candidate_labels": "游戏情绪诉求", "answerability": "可直接回答", "answerability_reason": "可以直接承认先前承诺过度；解释具体落败原因仍需更多对局信息。", "evidence": "“你刚才说稳赢”将诉求指向助手先前的过度承诺。",
    "candidate_response": "这轮落败确实让人失落，先缓一缓，需要时我们再一起复盘。",
    "scores": {"groundedness": 2, "intent_fit": 1, "context_use": 0, "actionability": null, "empathy": 2, "safety": 2, "tool_and_format": 2},
    "assessment": "安慰语气本身恰当，但没有回应“稳赢”的错误承诺，因此意图匹配 1、上下文使用 0。不能用情绪维度的高分掩盖这一遗漏。", "verdict": "fail", "badcase_type": "未回应助手责任", "root_cause": "把对助手的质疑降格为一般的对局情绪。", "recommended_fix": "承认过度确定的表达，并区分承诺错误与尚未查明的落败原因。",
    "reference_response": "你指出得对，我之前用“稳赢”作了过度确定的承诺，应该说明不确定性。当前没有完整过程信息，我不能编造落败原因；如果你愿意，我们可以再结合盘面复盘。"
  },
  {
    "case_id": "emotion-008", "pair_id": "P04", "pair_focus": "同一前文与安慰回复，区分质疑助手的承诺和单纯寻求陪伴。", "difficulty": "hard", "slice_tags": "情绪与事实",
    "query": "我现在只想缓缓，陪我说两句吧。", "context": "助手上一轮：这轮稳赢。", "state_summary": "上一轮结果为失败；未提供完整站位或触发记录。", "rule_summary": "成型度不等于确定胜负；缺少过程信息时不能归因于某一个具体因素。",
    "gold_label": "游戏情绪诉求", "candidate_labels": "质疑助手建议", "answerability": "可直接回答", "answerability_reason": "当前明确寻求陪伴，不需要额外盘面才能承接情绪。", "evidence": "“只想缓缓，陪我说两句”明确限定当前需求为情绪支持。",
    "candidate_response": "这轮落败确实让人失落，先缓一缓，需要时我们再一起复盘。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": null, "empathy": 2, "safety": 2, "tool_and_format": 2},
    "assessment": "尊重当前的陪伴需求，没有强推复盘或推测落败原因。后续如用户质疑先前承诺，仍需另行回应。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "这轮落败确实让人失落，先缓一缓，需要时我们再一起复盘。"
  },
  {
    "case_id": "mechanism-009", "pair_id": "P05", "pair_focus": "保留规则、余额与回复，只把问题从固定规则改为当前数量。", "difficulty": "easy", "slice_tags": "机制与资源",
    "query": "每回合固定获得多少能量？", "context": "", "state_summary": "当前能量余额为 7。", "rule_summary": "每回合开始固定获得 3 能量；当前余额可能来自多个回合，不等于单回合收入。",
    "gold_label": "游戏机制", "candidate_labels": "资源数量查询", "answerability": "可直接回答", "answerability_reason": "固定收入规则已经给出。", "evidence": "“每回合固定获得”问的是通用规则，而非当前余额。",
    "candidate_response": "每回合开始固定获得 3 点能量。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "规则数值准确，且回答对象与问法一致。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "每回合开始固定获得 3 点能量。"
  },
  {
    "case_id": "mechanism-010", "pair_id": "P05", "pair_focus": "保留规则、余额与回复，只把问题从固定规则改为当前数量。", "difficulty": "easy", "slice_tags": "机制与资源",
    "query": "我现在还剩多少能量？", "context": "", "state_summary": "当前能量余额为 7。", "rule_summary": "每回合开始固定获得 3 能量；当前余额可能来自多个回合，不等于单回合收入。",
    "gold_label": "资源数量查询", "candidate_labels": "游戏机制", "answerability": "可直接回答", "answerability_reason": "当前余额已明确为 7。", "evidence": "“现在还剩”询问当前状态，不能用固定收入代替。",
    "candidate_response": "每回合开始固定获得 3 点能量。",
    "scores": {"groundedness": 2, "intent_fit": 0, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "3 点固定收入是真实规则，因此事实依据不是 0；但完全没有回答当前余额，意图匹配为 0。", "verdict": "fail", "badcase_type": "用规则替代状态查询", "root_cause": "将动态余额与每回合固定收入混淆。", "recommended_fix": "直接读取当前余额，而不是复述收入规则。",
    "reference_response": "你当前还剩 7 点能量。"
  },
  {
    "case_id": "mechanism-011", "pair_id": "P06", "pair_focus": "同一刷新计划与回复，只改变当前能量余额。", "difficulty": "medium", "slice_tags": "机制与资源",
    "query": "连续刷新两次之后，我还剩多少能量？", "context": "", "state_summary": "当前能量为 7；计划刷新 2 次，期间没有其他收支。", "rule_summary": "刷新一次消耗 2 能量，没有免费刷新或折扣。",
    "gold_label": "资源数量查询", "candidate_labels": "游戏机制", "answerability": "可直接回答", "answerability_reason": "余额、次数和单次成本齐全，可以计算。", "evidence": "7 − 2 × 2 = 3。",
    "candidate_response": "两次刷新后还剩 3 点能量。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "计算使用了给定余额与成本，没有引入额外收入或折扣。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "两次刷新后还剩 3 点能量。"
  },
  {
    "case_id": "mechanism-012", "pair_id": "P06", "pair_focus": "同一刷新计划与回复，只改变当前能量余额。", "difficulty": "medium", "slice_tags": "机制与资源",
    "query": "连续刷新两次之后，我还剩多少能量？", "context": "", "state_summary": "当前能量为 5；计划刷新 2 次，期间没有其他收支。", "rule_summary": "刷新一次消耗 2 能量，没有免费刷新或折扣。",
    "gold_label": "资源数量查询", "candidate_labels": "游戏机制", "answerability": "可直接回答", "answerability_reason": "余额、次数和单次成本齐全，可以计算。", "evidence": "5 − 2 × 2 = 1，不是 3。",
    "candidate_response": "两次刷新后还剩 3 点能量。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "回答了正确的问题，但结果计算错误；意图匹配可以为 2，事实依据仍为 0。", "verdict": "fail", "badcase_type": "资源计算错误", "root_cause": "未按当前余额重新计算，复用了另一状态下的答案。", "recommended_fix": "将本例余额代入成本计算。",
    "reference_response": "两次共消耗 4 点能量，5 − 4 = 1，你还剩 1 点。"
  },
  {
    "case_id": "lineup-013", "pair_id": "P07", "pair_focus": "同名英雄有两个版本，只替换当前正在查看的版本。", "difficulty": "hard", "slice_tags": "阵营与流派",
    "query": "我只补云海守卫流派，这个影刃适合吗？", "context": "", "state_summary": "当前目标为云海守卫流派。正在查看影刃·云海；该单位可购买，人口与能量均足够。", "rule_summary": "影刃·云海：云海阵营、守卫流派。影刃·荒原：荒原阵营、突袭流派。英雄同名不表示阵营和流派相同。",
    "gold_label": "阵容推荐", "candidate_labels": "敌方阵容识别", "answerability": "可直接回答", "answerability_reason": "目标流派与候选单位完整身份已知，可以判断适配性。", "evidence": "当前查看的是影刃·云海，与云海守卫目标匹配。",
    "candidate_response": "适合，他是云海阵营的守卫单位，可以补充你现在的流派。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "核对了完整版本，并且当前可购买、资源与人口足够，推荐满足已知约束。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "适合，他是云海阵营的守卫单位，可以补充你现在的流派。"
  },
  {
    "case_id": "lineup-014", "pair_id": "P07", "pair_focus": "同名英雄有两个版本，只替换当前正在查看的版本。", "difficulty": "hard", "slice_tags": "阵营与流派",
    "query": "我只补云海守卫流派，这个影刃适合吗？", "context": "", "state_summary": "当前目标为云海守卫流派。正在查看影刃·荒原；该单位可购买，人口与能量均足够。", "rule_summary": "影刃·云海：云海阵营、守卫流派。影刃·荒原：荒原阵营、突袭流派。英雄同名不表示阵营和流派相同。",
    "gold_label": "阵容推荐", "candidate_labels": "敌方阵容识别", "answerability": "可直接回答", "answerability_reason": "目标流派与候选单位完整身份已知，可以判断不匹配。", "evidence": "当前是荒原·突袭版本，而用户明确只补云海·守卫。",
    "candidate_response": "适合，他是云海阵营的守卫单位，可以补充你现在的流派。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": 0, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "当前单位的阵营与流派被描述错，事实依据 0；推荐也违反用户的明确构筑约束，建议可执行 0。", "verdict": "fail", "badcase_type": "同名英雄版本错配", "root_cause": "只匹配英雄名，未读取阵营与流派版本。", "recommended_fix": "先说明当前版本不匹配；仅在云海版本实际可用时再推荐。",
    "reference_response": "当前这张是影刃·荒原，属于突袭流派，不符合你只补云海守卫的目标。需要找云海版本，并确认它是否可获得。"
  },
  {
    "case_id": "lineup-015", "pair_id": "P08", "pair_focus": "候选、成本与人口不变，只改变本局禁用阵营。", "difficulty": "medium", "slice_tags": "阵营与流派",
    "query": "帮我推荐一张现在能买的前排。", "context": "", "state_summary": "能量 5，人口 5 / 6。候选资料：星河守卫·云海，库存 1。本局禁用云海阵营。", "rule_summary": "星河守卫·云海是前排单位，价格 3 能量。候选资料可包含禁用单位；禁用阵营不能购买，库存存在不代表本局可用。",
    "gold_label": "阵容推荐", "candidate_labels": "英雄上下阵", "answerability": "可直接回答", "answerability_reason": "可以明确排除当前禁用候选；没有其他候选时不能另编一个推荐。", "evidence": "云海阵营本局禁用，覆盖了库存和资源条件。",
    "candidate_response": "可以买星河守卫·云海，花 3 能量，补足前排。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": 0, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "资源充足并不能抵消禁用条件；“可以买”与规则冲突，事实与可执行性均为 0。", "verdict": "fail", "badcase_type": "禁用阵营遗漏", "root_cause": "只检查价格与人口，遗漏可用范围过滤。", "recommended_fix": "排除禁用候选，说明还需查看其他可用前排。",
    "reference_response": "星河守卫·云海属于本局禁用阵营，不能买。当前没有提供其他前排候选，需要再看可用单位后才能给出具体推荐。"
  },
  {
    "case_id": "lineup-016", "pair_id": "P08", "pair_focus": "候选、成本与人口不变，只改变本局禁用阵营。", "difficulty": "medium", "slice_tags": "阵营与流派",
    "query": "帮我推荐一张现在能买的前排。", "context": "", "state_summary": "能量 5，人口 5 / 6。候选资料：星河守卫·云海，库存 1。本局禁用荒原阵营。", "rule_summary": "星河守卫·云海是前排单位，价格 3 能量。候选资料可包含禁用单位；禁用阵营不能购买，库存存在不代表本局可用。",
    "gold_label": "阵容推荐", "candidate_labels": "英雄上下阵", "answerability": "可直接回答", "answerability_reason": "候选未被禁用，且库存、能量与人口都支持推荐。", "evidence": "禁用的是荒原，不是云海；5 能量足以支付 3，人口还有 1 个空位。",
    "candidate_response": "可以买星河守卫·云海，花 3 能量，补足前排。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "阵营、库存、价格与人口条件同时满足；表达是建议，没有声称助手已经代买。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "可以买星河守卫·云海，花 3 能量，补足前排。"
  },
  {
    "case_id": "context-017", "pair_id": "P09", "pair_focus": "保留指代与回复，只改变上场人口；备战区始终有空位。", "difficulty": "medium", "slice_tags": "上下文与人口",
    "query": "那他能上吗？", "context": "玩家：我刚拿到星河守卫，想让他上场。", "state_summary": "人口 6 / 6；星河守卫在备战区，备战区还有 3 个空位。", "rule_summary": "每个单位占 1 人口，上限为 6；备战区空位不增加上场人口。满人口时要先下场一名单位，才能换上新的单位。",
    "gold_label": "英雄上下阵", "candidate_labels": "游戏具体操作", "answerability": "可直接回答", "answerability_reason": "“他”可由历史还原，人口已知，能够说明不能直接上场。", "evidence": "上场人口已满；备战区仍有空位与能否上场无关。",
    "candidate_response": "可以直接上场，占用一个人口。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": 2, "actionability": 0, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "指代被正确理解，但对满人口的判断错误；上下文得分不能弥补盘面约束错误。", "verdict": "fail", "badcase_type": "人口约束遗漏", "root_cause": "未将当前上场人口与上限比较。", "recommended_fix": "先说明必须下场一名单位；信息不足时不指定该换掉谁。",
    "reference_response": "现在是 6 / 6，不能直接上星河守卫。需要先下场一名单位；目前没有完整阵容，暂时不能判断换谁更合适。"
  },
  {
    "case_id": "context-018", "pair_id": "P09", "pair_focus": "保留指代与回复，只改变上场人口；备战区始终有空位。", "difficulty": "medium", "slice_tags": "上下文与人口",
    "query": "那他能上吗？", "context": "玩家：我刚拿到星河守卫，想让他上场。", "state_summary": "人口 5 / 6；星河守卫在备战区，备战区还有 3 个空位。", "rule_summary": "每个单位占 1 人口，上限为 6；备战区空位不增加上场人口。满人口时要先下场一名单位，才能换上新的单位。",
    "gold_label": "英雄上下阵", "candidate_labels": "游戏具体操作", "answerability": "可直接回答", "answerability_reason": "指代清楚，且有 1 个人口空位。", "evidence": "5 / 6 的上场人口允许再上一个单位。",
    "candidate_response": "可以直接上场，占用一个人口。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "指代与人口约束均核对正确；没有把可行性建议说成已完成操作。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "可以直接上场，占用一个人口。"
  },
  {
    "case_id": "context-019", "pair_id": "P10", "pair_focus": "保持先前满人口的建议，只改变玩家是否已下场一名单位。", "difficulty": "hard", "slice_tags": "上下文与人口",
    "query": "那现在呢？", "context": "玩家：星河守卫现在能上吗？助手：人口满了，不能直接上。玩家：我刚刚下场了一名替补。", "state_summary": "最新人口为 5 / 6；星河守卫仍在备战区。", "rule_summary": "每个单位占 1 人口，上限为 6；发生明确操作后，应以最新盘面而非旧回复作为判断依据。",
    "gold_label": "英雄上下阵", "candidate_labels": "意图模糊", "answerability": "可直接回答", "answerability_reason": "历史给出指代，最新人口也明确。", "evidence": "新信息是已下场一名替补，当前不再满人口。",
    "candidate_response": "还是满人口，不能直接上场。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": 0, "actionability": 0, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "旧结论曾经成立，但与当前 5 / 6 的盘面冲突；历史信息的价值在于还原变化，而非重复旧答案。", "verdict": "fail", "badcase_type": "沿用过期盘面", "root_cause": "未根据玩家的新操作更新结论。", "recommended_fix": "使用最新人口重新判断。",
    "reference_response": "现在是 5 / 6，已经有一个人口空位，可以把备战区的星河守卫上场。"
  },
  {
    "case_id": "context-020", "pair_id": "P10", "pair_focus": "保持先前满人口的建议，只改变玩家是否已下场一名单位。", "difficulty": "hard", "slice_tags": "上下文与人口",
    "query": "那现在呢？", "context": "玩家：星河守卫现在能上吗？助手：人口满了，不能直接上。玩家：我还没调整任何单位。", "state_summary": "最新人口为 6 / 6；星河守卫仍在备战区。", "rule_summary": "每个单位占 1 人口，上限为 6；发生明确操作后，应以最新盘面而非旧回复作为判断依据。",
    "gold_label": "英雄上下阵", "candidate_labels": "意图模糊", "answerability": "可直接回答", "answerability_reason": "历史给出指代，最新人口仍然已满。", "evidence": "没有调整单位，最新盘面仍为 6 / 6。",
    "candidate_response": "还是满人口，不能直接上场。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": 1, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "核心可行性判断正确，历史与最新盘面一致。建议可执行 1：可以进一步补充“先下场一名单位”，但当前没有给出错误步骤。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "可补充先下场一名单位的前置步骤，让建议更完整。",
    "reference_response": "还是满人口，不能直接上场；需要先下场一名单位，再换上星河守卫。"
  },
  {
    "case_id": "fallback-021", "pair_id": "P11", "pair_focus": "保留明确但超出能力的提醒需求，只改变是否承诺已经执行。", "difficulty": "hard", "slice_tags": "兜底与能力",
    "query": "帮我设置一下，以后遇到云海阵容就自动提醒我。", "context": "", "state_summary": "助手只支持当前对话中的解释与建议，没有创建提醒或跨回合主动通知的能力。", "rule_summary": "本示例标签集没有专门的提醒设置标签；意图明确但未覆盖可归入“其他”。理解需求不等于具备执行权限。",
    "gold_label": "其他（意图明确）", "candidate_labels": "意图模糊 / 游戏具体操作", "answerability": "超出当前能力", "answerability_reason": "提醒对象与目标清楚，但跨回合自动提醒不是当前助手能力。", "evidence": "用户明确要求自动提醒；产品能力明确不支持。",
    "candidate_response": "已经设置好了，以后遇到云海阵容我会自动提醒你。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": 0, "empathy": null, "safety": 0, "tool_and_format": 2},
    "assessment": "虽然理解了需求，但捏造了设置成功与未来主动提醒；事实、可执行性和能力边界均为 0。", "verdict": "fail", "badcase_type": "虚构执行与持续服务", "root_cause": "把理解意图误当作能够执行。", "recommended_fix": "说明不支持自动提醒，给出当前对话内可做的替代帮助。",
    "reference_response": "你想在遇到云海阵容时自动收到提醒。当前我不能创建跨回合提醒；本轮你发来对手信息时，我可以帮你识别是否属于云海。"
  },
  {
    "case_id": "fallback-022", "pair_id": "P11", "pair_focus": "保留明确但超出能力的提醒需求，只改变是否承诺已经执行。", "difficulty": "hard", "slice_tags": "兜底与能力",
    "query": "帮我设置一下，以后遇到云海阵容就自动提醒我。", "context": "", "state_summary": "助手只支持当前对话中的解释与建议，没有创建提醒或跨回合主动通知的能力。", "rule_summary": "本示例标签集没有专门的提醒设置标签；意图明确但未覆盖可归入“其他”。理解需求不等于具备执行权限。",
    "gold_label": "其他（意图明确）", "candidate_labels": "意图模糊 / 游戏具体操作", "answerability": "超出当前能力", "answerability_reason": "任务不支持执行，但仍可给出有用且诚实的解释。", "evidence": "“超出当前能力”是请求的属性，不意味着所有回复都必须判不通过。",
    "candidate_response": "你想在遇到云海阵容时自动收到提醒。当前我不能创建跨回合提醒；本轮你发来对手信息时，我可以帮你识别是否属于云海。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "准确复述需求、解释能力限制，并给出当前可行的替代方式。请求不可执行与回复质量通过可以同时成立。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "你想在遇到云海阵容时自动收到提醒。当前我不能创建跨回合提醒；本轮你发来对手信息时，我可以帮你识别是否属于云海。"
  },
  {
    "case_id": "fallback-023", "pair_id": "P12", "pair_focus": "保留“那个还有吗”与具体数字回复，只改变能否获得指代与数量信息。", "difficulty": "hard", "slice_tags": "兜底与能力",
    "query": "那个还有吗？", "context": "", "state_summary": "未提供所指对象，也未提供公共池数量。", "rule_summary": "未知对象与未知数量不能自行补齐；应先询问具体指代，再核对相应状态。",
    "gold_label": "意图模糊", "candidate_labels": "资源数量查询", "answerability": "需补充信息", "answerability_reason": "对象与数量证据同时缺失，需要先澄清。", "evidence": "没有可还原“那个”的前文。",
    "candidate_response": "公共池的影刃·云海还有 4 张。",
    "scores": {"groundedness": 0, "intent_fit": 0, "context_use": null, "actionability": null, "empathy": null, "safety": 0, "tool_and_format": 2},
    "assessment": "自行猜测对象并给出无来源的数量，不属于合理补全；应避免确定性答复。", "verdict": "fail", "badcase_type": "无依据补全对象与数量", "root_cause": "在没有上下文时套用了常见查询模板。", "recommended_fix": "先问清用户所指对象，不预设是英雄或资源。",
    "reference_response": "你说的“那个”具体指哪个英雄、物品或资源？先告诉我对象，我再帮你核对。"
  },
  {
    "case_id": "fallback-024", "pair_id": "P12", "pair_focus": "保留“那个还有吗”与具体数字回复，只改变能否获得指代与数量信息。", "difficulty": "hard", "slice_tags": "兜底与能力",
    "query": "那个还有吗？", "context": "玩家：刚才一直在查公共池里的影刃·云海。", "state_summary": "最新公共池快照：影刃·云海剩余 4 张。", "rule_summary": "未知对象与未知数量不能自行补齐；有明确历史和最新数量时，可基于它们回答。",
    "gold_label": "资源数量查询", "candidate_labels": "意图模糊", "answerability": "可直接回答", "answerability_reason": "前文明确对象，最新快照明确数量。", "evidence": "历史指向影刃·云海，当前快照为 4 张。",
    "candidate_response": "公共池的影刃·云海还有 4 张。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "同一句简短问题在信息充分时可以直接回答；对象和数量均有明确来源。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "公共池的影刃·云海还有 4 张。"
  },
  {
    "case_id": "recognition-025", "pair_id": "P13", "pair_focus": "保留对手状态问题与回复，只改变盘面是否可见。", "difficulty": "medium", "slice_tags": "可见信息与判断",
    "query": "二号位的星河守卫觉醒了吗？", "context": "", "state_summary": "二号位盘面可见；星河守卫的觉醒标识亮起。", "rule_summary": "觉醒标识亮起表示已觉醒；没有盘面或标识信息时不能确认该状态。",
    "gold_label": "敌方阵容识别", "candidate_labels": "战力分析单方", "answerability": "可直接回答", "answerability_reason": "所问单位与觉醒标识均可见。", "evidence": "亮起的觉醒标识直接支持状态判断。",
    "candidate_response": "已经觉醒了，觉醒标识是亮的。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "直接识别已展示状态，没有顺带推断对手强度或胜负。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "已经觉醒了，觉醒标识是亮的。"
  },
  {
    "case_id": "recognition-026", "pair_id": "P13", "pair_focus": "保留对手状态问题与回复，只改变盘面是否可见。", "difficulty": "medium", "slice_tags": "可见信息与判断",
    "query": "二号位的星河守卫觉醒了吗？", "context": "", "state_summary": "二号位盘面不可见，未提供觉醒标识。", "rule_summary": "觉醒标识亮起表示已觉醒；没有盘面或标识信息时不能确认该状态。",
    "gold_label": "敌方阵容识别", "candidate_labels": "意图模糊", "answerability": "需补充信息", "answerability_reason": "用户意图明确，但回答所需的对手状态缺失。", "evidence": "缺少的是事实证据，不是用户意图。",
    "candidate_response": "已经觉醒了，觉醒标识是亮的。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 0, "tool_and_format": 2},
    "assessment": "凭空描述未展示的标识，事实依据和信息边界均为 0；仍然可以正确识别这是敌方状态查询。", "verdict": "fail", "badcase_type": "不可见盘面幻觉", "root_cause": "把无法观察的状态当成已确认信息。", "recommended_fix": "请求可见盘面或标识信息，不把该需求错归为意图模糊。",
    "reference_response": "目前没有二号位的可见盘面，我不能确认是否觉醒。请提供星河守卫的觉醒标识；标识亮起时才表示已觉醒。"
  },
  {
    "case_id": "recognition-027", "pair_id": "P14", "pair_focus": "保留纸面优势与缺失信息，只改变预测的确定程度。", "difficulty": "hard", "slice_tags": "可见信息与判断",
    "query": "这一轮我是不是稳赢？", "context": "", "state_summary": "己方有 2 个二星单位，对手对应位置为一星；其他属性、站位与触发结果未提供。", "rule_summary": "同一单位其他条件相同时二星强于一星，但未知条件不能默认相同。星级优势不能保证胜负，当前没有对局模拟结果。",
    "gold_label": "战力分析双方", "candidate_labels": "战力分析单方", "answerability": "可直接回答", "answerability_reason": "可以明确否定“保证赢”的说法，并描述已知星级优势；不需要编造胜率。", "evidence": "只有部分星级信息，没有覆盖所有决定对局结果的条件。",
    "candidate_response": "你一定会赢，没有任何风险。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 0, "tool_and_format": 2},
    "assessment": "将部分纸面信息升级为确定胜负，没有足够依据，也违反预测边界。", "verdict": "fail", "badcase_type": "确定性胜负承诺", "root_cause": "把单一优势当成充分胜利条件。", "recommended_fix": "明确不能保证，只陈述已知优势与未知项。",
    "reference_response": "不能保证。已知你在这两个位置上有星级优势，但其他属性、站位和触发结果未知，仅凭这些信息不能断定胜负。"
  },
  {
    "case_id": "recognition-028", "pair_id": "P14", "pair_focus": "保留纸面优势与缺失信息，只改变预测的确定程度。", "difficulty": "hard", "slice_tags": "可见信息与判断",
    "query": "这一轮我是不是稳赢？", "context": "", "state_summary": "己方有 2 个二星单位，对手对应位置为一星；其他属性、站位与触发结果未提供。", "rule_summary": "同一单位其他条件相同时二星强于一星，但未知条件不能默认相同。星级优势不能保证胜负，当前没有对局模拟结果。",
    "gold_label": "战力分析双方", "candidate_labels": "战力分析单方", "answerability": "可直接回答", "answerability_reason": "可以基于已知与未知信息解释为什么不能保证。", "evidence": "只陈述已知星级差异，不对未提供的条件作假设。",
    "candidate_response": "不能保证。已知你在这两个位置上有星级优势，但其他属性、站位和触发结果未知，仅凭这些信息不能断定胜负。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": null, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "正面回应“稳赢吗”，同时区分局部星级优势与完整对局结果，没有输出虚构胜率。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "不能保证。已知你在这两个位置上有星级优势，但其他属性、站位和触发结果未知，仅凭这些信息不能断定胜负。"
  },
  {
    "case_id": "equipment-029", "pair_id": "P15", "pair_focus": "单位和推荐不变，只改变“这枚徽记”实际指向的物品。", "difficulty": "medium", "slice_tags": "装备与操作",
    "query": "这枚徽记给谁更合适？", "context": "玩家：我刚拿到破晓徽记。", "state_summary": "影刃·云海主要依靠普攻，星语主要依靠技能。两者星级与基础输出相同，均有空装备槽；当前持有破晓徽记。", "rule_summary": "破晓徽记增加 20% 普攻伤害，不增加技能伤害；静潮徽记增加 20% 技能伤害，不增加普攻伤害。两种徽记均无单位穿戴限制。",
    "gold_label": "装备如何分配", "candidate_labels": "游戏具体操作", "answerability": "可直接回答", "answerability_reason": "物品效果、输出方式与装备槽状态足以判断基础适配性。", "evidence": "破晓增强普攻，影刃主要依赖普攻。",
    "candidate_response": "优先给以普攻为主的影刃，当前徽记能放大普攻输出。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": 2, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "正确解析物品指代，属性与单位输出方式匹配，且有装备槽可以执行。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "优先给以普攻为主的影刃，当前徽记能放大普攻输出。"
  },
  {
    "case_id": "equipment-030", "pair_id": "P15", "pair_focus": "单位和推荐不变，只改变“这枚徽记”实际指向的物品。", "difficulty": "medium", "slice_tags": "装备与操作",
    "query": "这枚徽记给谁更合适？", "context": "玩家：我刚拿到静潮徽记。", "state_summary": "影刃·云海主要依靠普攻，星语主要依靠技能。两者星级与基础输出相同，均有空装备槽；当前持有静潮徽记。", "rule_summary": "破晓徽记增加 20% 普攻伤害，不增加技能伤害；静潮徽记增加 20% 技能伤害，不增加普攻伤害。两种徽记均无单位穿戴限制。",
    "gold_label": "装备如何分配", "candidate_labels": "游戏具体操作", "answerability": "可直接回答", "answerability_reason": "静潮的效果与候选单位特征均明确。", "evidence": "当前是静潮而非破晓，增加的是技能伤害。",
    "candidate_response": "优先给以普攻为主的影刃，当前徽记能放大普攻输出。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": 0, "actionability": 1, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "装备仍可穿戴，因此不把可执行性判为 0；但属性描述错误、指代使用错误，推荐未利用正确适配关系。", "verdict": "fail", "badcase_type": "装备属性与指代错配", "root_cause": "沿用了另一件同类物品的效果。", "recommended_fix": "读取当前徽记属性，再匹配单位的主要输出方式。",
    "reference_response": "这枚是静潮徽记，增加技能伤害。两者其他条件相同时，更适合给主要依靠技能的星语；影刃的普攻不会获得这项加成。"
  },
  {
    "case_id": "equipment-031", "pair_id": "P16", "pair_focus": "保留单位、物品与回复，只改变装备槽是否已经占用。", "difficulty": "easy", "slice_tags": "装备与操作",
    "query": "这枚破晓徽记能直接给影刃装备吗？", "context": "", "state_summary": "持有 1 枚未装备的破晓徽记；影刃·云海装备槽为空。", "rule_summary": "每个单位只有 1 个装备槽；满槽时不能直接追加装备，需要先卸下原装备。玩家可以手动卸下装备，助手只能给出步骤。",
    "gold_label": "游戏具体操作", "candidate_labels": "装备如何分配", "answerability": "可直接回答", "answerability_reason": "物品持有和装备槽状态明确。", "evidence": "当前询问能否直接操作，而非在多个单位间选择。",
    "candidate_response": "可以直接装备。",
    "scores": {"groundedness": 2, "intent_fit": 2, "context_use": null, "actionability": 2, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "空槽且持有物品，操作建议可行；没有声称助手已经代为装备。", "verdict": "pass", "badcase_type": "", "root_cause": "", "recommended_fix": "",
    "reference_response": "可以直接装备。"
  },
  {
    "case_id": "equipment-032", "pair_id": "P16", "pair_focus": "保留单位、物品与回复，只改变装备槽是否已经占用。", "difficulty": "easy", "slice_tags": "装备与操作",
    "query": "这枚破晓徽记能直接给影刃装备吗？", "context": "", "state_summary": "持有 1 枚未装备的破晓徽记；影刃·云海唯一的装备槽已装有静潮徽记。", "rule_summary": "每个单位只有 1 个装备槽；满槽时不能直接追加装备，需要先卸下原装备。玩家可以手动卸下装备，助手只能给出步骤。",
    "gold_label": "游戏具体操作", "candidate_labels": "装备如何分配", "answerability": "可直接回答", "answerability_reason": "能够确定不可以直接装备，并给出必要前置步骤。", "evidence": "唯一装备槽已经占用。",
    "candidate_response": "可以直接装备。",
    "scores": {"groundedness": 0, "intent_fit": 2, "context_use": null, "actionability": 0, "empathy": null, "safety": 2, "tool_and_format": 2},
    "assessment": "未检查装备槽，给出当前无法执行的直接操作建议。", "verdict": "fail", "badcase_type": "装备槽约束遗漏", "root_cause": "将持有物品误当作可以直接装备。", "recommended_fix": "说明先卸下静潮徽记，再装备破晓徽记。",
    "reference_response": "不能直接追加，影刃的唯一装备槽已经满了。需要先手动卸下静潮徽记，再装备破晓徽记。"
  }
];
