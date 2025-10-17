function StorySection() {
  return (
    <section
      className="bg-[#f5f1eb] py-20"
      role="region"
      aria-label="브랜드 스토리"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h2 className="font-brand text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-8">
            Ga.Rang.B의 이야기
          </h2>
          <div className="space-y-6 text-[#6b6b6b] leading-relaxed">
            <blockquote className="text-lg italic">
              &quot;가랑비처럼 은은하게 내려앉는 순간들을 사진으로
              담습니다.&quot;
            </blockquote>
            <p>
              각 사진은 단순한 기록이 아닌, 그 순간의 감정과 이야기가 담긴
              작품입니다. 일상 속에서 발견하는 아름다운 순간들, 사람들의 진실한
              모습, 그리고 시간이 흘러도 잊히지 않을 특별한 기억들을 카메라
              렌즈를 통해 담아냅니다.
            </p>
            <p>
              엽서로 만나보는 이 사진들은 단순한 소통의 도구를 넘어, 받는 이에게
              따뜻한 위로와 기쁨을 전달하는 특별한 선물이 될 것입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
