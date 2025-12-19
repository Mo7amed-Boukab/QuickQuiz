import { Users, CheckCircle, BarChart3 } from 'lucide-react';
import Header from '../../components/Header';

export default function Home() {

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-600 opacity-5"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Master Web Development
                        <span className="block mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            One Quiz at a Time
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Test your knowledge, track your progress, and become a better developer with our comprehensive quiz platform designed for modern web technologies.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3">
                            <Users className="w-5 h-5 text-gray-900" />
                            <div className="text-left">
                                <div className="font-semibold">12,000+</div>
                                <div className="text-sm text-gray-600">Active Learners</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3">
                            <CheckCircle className="w-5 h-5 text-gray-900" />
                            <div className="text-left">
                                <div className="font-semibold">45,000+</div>
                                <div className="text-sm text-gray-600">Quizzes Completed</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3">
                            <BarChart3 className="w-5 h-5 text-gray-900" />
                            <div className="text-left">
                                <div className="font-semibold">87%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => document.querySelector('#quizzes').scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 px-8 py-2.5 bg-black text-white rounded font-small hover:bg-gray-800 transition-colors"
                    >
                        Start Learning
                    </button>
                </div>
            </section>

        </div>   
    );
}
